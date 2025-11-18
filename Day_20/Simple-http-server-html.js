const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // const {url: reqUrl, headers} = req;
    const reqUrl = req.url;
    const headers = req.headers;

    console.log( headers);
    console.log( headers['user-agent'] );
    
    const parts = url.parse(reqUrl, true);
    console.log(parts);


    switch (parts.pathname) {
        case '/about':
            res.setHeader('Content-Type', 'text/html');
            res.end(
                `
                <!doctype html>
                    <html>
                        <body>This is the About Page</body>
                    </html>
                `
            );
            break;
        case '/home':
            res.setHeader('Content-Type', 'text/html');
            res.end(
                `
                <!doctype html>
                    <html>
                        <body>Welcome to the Home Page</body>
                    </html>
                `
            );
            break;
       
        default:
            // res.statusCode = 404;
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end(' <!doctype html><html><body>404 Not Found</body></html> ');
    }
});

server.listen(3000);