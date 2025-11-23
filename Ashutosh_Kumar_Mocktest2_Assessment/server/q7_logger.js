const fs = require('fs');
const path = require('path');
const http = require('http');

// 1. Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// 2. Write "App started" to logs/app.log
const logFile = path.join(logsDir, 'app.log');
const logMessage = `App started at ${new Date().toISOString()}\n`;

fs.appendFile(logFile, logMessage, (err) => {
    if (err) {
        console.error('Failed to write to log file:', err);
    } else {
        console.log('Log written to logs/app.log');
    }
});

// 3. Create HTTP server
const PORT = 8080;
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'running' }));
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
