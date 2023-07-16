const http = require('http');
const fs = require('fs');
const PORT = 8181;
fs.readFile('./index.html', (err, html)=>{
    err ? console.log(err) : null;
    http.createServer((request, response)=>{
        response.writeHeader(200, {"Content-Type": "application/html"});
        response.write(html);
        response.end();
    }).listen(PORT)
})
