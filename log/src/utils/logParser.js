/**
 * Utility to parse complex log lines according to assessment requirements.
 * Handles:
 * - Different timestamp formats (ISO, normal, Unix epoch)
 * - JSON formatted lines
 * - Missing/replaced status codes
 * - Different response time units (ms, s, missing units)
 * - Malformed lines (returns null)
 */
export function parseLogLine(line) {
    if (!line || line.trim() === '') return null;
    line = line.trim();
    
    // 1. Try to parse as JSON first (as per instructions, JSON formats might be mixed in)
    if (line.startsWith('{')) {
        try {
            const obj = JSON.parse(line);
            if (obj.ip && obj.method && obj.path) {
                return {
                    ip: obj.ip,
                    method: obj.method,
                    path: obj.path,
                    status: obj.status && obj.status !== '-' ? parseInt(obj.status, 10) : null,
                    timeRaw: obj.time,
                    timeMs: normalizeTime(String(obj.time || '0'))
                };
            }
        } catch (e) {
            // Not a valid JSON or doesn't match format, fall through to regex
        }
    }

    // 2. Try parsing with Regex.
    // We look for the main components regardless of what weird timestamp is at the front
    // or what extra fields (user agent, etc) are at the back.
    // IP: (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})
    // Method: ([A-Z]{3,7})
    // Path: (\/\S*)
    // Status: (\d{3}|-)
    // Time: (\d+(?:\.\d+)?(?:ms|s)?)
    const regex = /\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+([A-Z]{3,7})\s+(\/\S*)\s+(\d{3}|-)\s+(\d+(?:\.\d+)?(?:ms|s)?)/;
    const match = line.match(regex);
    
    if (match) {
        return {
            ip: match[1],
            method: match[2],
            path: match[3],
            status: match[4] === '-' ? null : parseInt(match[4], 10),
            timeRaw: match[5],
            timeMs: normalizeTime(match[5])
        };
    }

    // Completely malformed line
    return null;
}

// Normalizes time into milliseconds
function normalizeTime(timeStr) {
    if (!timeStr) return 0;
    let val = parseFloat(timeStr.replace(/[a-zA-Z]/g, ""));
    if (timeStr.includes('s') && !timeStr.includes('ms')) {
        val *= 1000; // Convert seconds to milliseconds
    }
    return val;
}
