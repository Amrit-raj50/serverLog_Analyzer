# Technical Assessment - Log Analyzer Answers

## 1. How to run
To run the Web App dashboard on a fresh machine:
1. Ensure Node.js and Python are installed.
2. Generate the test data:
   ```bash
   python scripts/generate_logs.py
   ```
   *This will create a `test.log` file in the `scripts/` directory containing 10,000 generated logs with edge cases.*
3. Start the Web Dashboard:
   ```bash
   cd log
   npm install
   npm run dev
   ```
4. Open the localhost link provided in the terminal (usually `http://localhost:5173`).
5. Click **Select Log File** and upload the `scripts/test.log` file you just generated.

## 2. Stack choice
I chose to build a **React + Vite Web App**. I chose this because a dashboard provides significantly more "useful output" for an on-call engineer than a raw CLI, allowing for quick visual scanning of metrics (Total Requests, IP Frequencies, Method breakdowns, Slowest Routes). It also allowed me to fulfill the requirement of building a premium, highly-styled UI.
A **worse choice** would have been a pure Bash/AWK script. While Bash is fast for simple parsing, it is difficult to maintain complex regex for JSON fallbacks and varying timestamps, and it completely lacks a graphical interface for non-technical stakeholders.

## 3. One real edge case
**Edge Case:** Response times in varying units (e.g., `142ms`, `0.142s`, or `142`).
**Handling:** Handled in `log/src/utils/logParser.js` (lines 40-47) inside the `normalizeTime` function.
**What would happen without it:** Without this handling, if the parser encounters `0.142s`, it would either fail to parse it entirely (resulting in NaN) or it would extract `0.142`. When calculating the "Slowest Route", `0.142` would incorrectly be evaluated as faster than `142` (from `142ms`), leading to completely inaccurate reporting on endpoint performance.

## 4. AI usage
This project was implemented using an AI coding assistant (Antigravity).
- **Tool:** Antigravity (Google DeepMind)
- **Usage 1:** Asked to generate a robust Python script to mock log files (`scripts/generate_logs.py`) simulating all the edge cases requested in the prompt.
- **Usage 2:** Asked to write a complex regex parser in JavaScript (`logParser.js`) to handle arbitrary timestamp lengths, JSON mixing, and missing status codes.
- **Change Made:** The AI initially proposed returning raw string matches from the regex. I changed the logic to parse the time string into a normalized integer (`timeMs`) so that mathematical comparisons could be reliably performed in the `Route.jsx` component.

## 5. Honest gap
**Gap:** The log parsing is currently executed synchronously on the main thread in the browser (`Landing.jsx` reading the file and triggering React renders).
**Fix:** For a file with a few hundred thousand lines, this will temporarily freeze the UI while the `forEach` loop processes the regex. With another day, I would move the parsing logic inside `logParser.js` into a **Web Worker**. This would allow the parsing to happen asynchronously in the background, keeping the UI perfectly responsive and allowing me to show a smooth animated loading progress bar while the file is processed.
