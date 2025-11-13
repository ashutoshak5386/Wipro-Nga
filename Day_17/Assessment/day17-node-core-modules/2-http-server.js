const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {
if (req.url === '/') {
const filePath = path.join(__dirname, 'index.html');
fs.readFile(filePath, (err, data) => {
if (err) {
res.writeHead(500);
return res.end('Error loading file');
}
res.writeHead(200, { 'Content-Type': 'text/html' });
res.end(data);
});
}


else if (req.url === '/about') {
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end('About Page');
}


else {
res.writeHead(404, { 'Content-Type': 'text/plain' });
res.end('404 Not Found');
}
});


server.listen(3000, () => {
console.log('Server running at http://localhost:3000');
});