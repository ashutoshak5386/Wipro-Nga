const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const reqUrl = req.url;
    
    const parts = url.parse(reqUrl, true);
    console.log(parts);

    const {x , y} = parts.query;

    switch (parts.pathname) {
        case '/add':
            res.end(`Result: ${Number(x) + Number(y)}`);
            break;
        case '/subtract':
            res.end(`Result: ${Number(x) - Number(y)}`);
            break;
        case '/multiply':
            res.end(`Result: ${Number(x) * Number(y)}`);
            break;
        default:
            res.end('Invalid operation. Use /add, /subtract, or /multiply with query parameters x and y.');
    }
});