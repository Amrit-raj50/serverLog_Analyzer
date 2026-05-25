import React from 'react';
import { useState } from 'react';
import { parseLogLine } from '../utils/logParser';

export default function Route({ file }) {
    // const [req , setReq] = useState(0);
    // const [freq , setFreq] = useState({});

    let maxRoute = "";
    let maxRes = 0;

    const lines = file.split('\n'); // spliting the file on the basis of lines

    lines.forEach(line => { // checking valid line and counting total valid request
        const parsed = parseLogLine(line);
        if (parsed) {
            let res = parsed.timeMs;
            let route = parsed.path;

            if (maxRes < res) {
                maxRes = res;
                maxRoute = route;
            }
        }
    });


    return (
        <div className="route-highlight">
            <div className="metric-label">Slowest Route:</div>
            <div style={{ wordBreak: 'break-all' }}>{maxRoute || "N/A"}</div>
            <span className="time">{maxRes} ms</span>
        </div>
    )
}