const http = require('http');
const fs=require('fs');
const path=require('path');

const PORT=8080;

const server = http.createServer((req, res)=>{
    let filename = "";

    if(req.url==='/'){
        filename='index.html';
    }else if(req.url==='/about'){
        filename='about.html';
    }else if(req.url==='/contact-me'){
        filename='contact-me.html';
    }else {
        filename='404.html';
    }

    const filepath=path.join(__dirname, filename);

    fs.readFile(filepath, (err, content)=>{
        if(err){
            res.writeHead(500, {'Content-type':'text/plain'});
            res.end('500 Internal Server Error');
            return;
        }

        const statusCode = filename==='404.html'?404:200;
        res.writeHead(statusCode, {'Content-type':'text/html'});
        res.end(content);
    });
});

server.listen(PORT, ()=>{
    console.log(`Server is running at listening at http://localhost:${PORT}`);
});