const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.url === '/budget') {
        let data = "[]";
        if (fs.existsSync('ledger.json'))
        {
            console.log("ledger.json exists");
            data = fs.readFileSync('ledger.json');
        }
        switch (req.method){
            case 'OPTIONS':
                res.writeHead(204);
                res.end();
                break;
            case 'GET':
                console.log("localhost:3000/budget GET received");
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
                break;
            case 'POST':
                let body = '';
                console.log("localhost:3000/budget POST received");

                req.on('data', (chunk) => {
                    body += chunk.toString();
                })
                req.on('end', () => {
                    console.log(body);
                })
                // Create the file
                //data.push(req.)
                //fs.writeFileSync('ledger.json', data);
                break;
            default:
                console.log("Sorry, out of method range");
        }
        
    } else { 
        res.end("Budget App Online");
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
