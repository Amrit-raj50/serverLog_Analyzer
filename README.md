# Log Analyzer Dashboard

A premium, highly-styled web dashboard to analyze server log files. It robustly parses complex log patterns (including JSON, missing fields, varying timestamps, and variable time units) and presents insightful metrics in a beautiful glassmorphic UI.

## Quick Start (Single Command)

To install dependencies and start the local development server, simply run:

```bash
cd log && npm install && npm run dev
```

Then open the localhost URL provided (usually `http://localhost:5173`) in your browser.

## Generating Test Data

If you need a sample log file to test the dashboard, you can use the included Python script to generate one containing thousands of lines and all expected edge cases (malformed lines, JSON, varying units):

```bash
python scripts/generate_logs.py
```

This will create a `test.log` file in the `scripts/` directory that you can upload directly to the dashboard.