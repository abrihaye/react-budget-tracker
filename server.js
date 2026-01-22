const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.url === '/budget') {
        switch (req.method){
            case 'OPTIONS':
                res.writeHead(204);
                res.end();
                break;
            case 'GET':
                console.log("localhost:3000/budget GET received");
                res.setHeader('Content-Type', 'application/json');
                let data = "[]";
                if (fs.existsSync('ledger.json'))
                {
                    console.log("ledger.json exists");
                    data = fs.readFileSync('ledger.json');
                }
                res.end(data);
                break;
            case 'POST':
                let body = '';
                console.log("localhost:3000/budget POST received");
                req.on('data', (chunk) => {
                    body += chunk.toString();
                })
                req.on('end', () => {
                    const newItem = JSON.parse(body);
                    
                    let currentLedger = [];
                    if (fs.existsSync('ledger.json')) {
                        currentLedger = JSON.parse(fs.readFileSync('ledger.json'));
                    }

                    currentLedger.push(newItem);
                    const data = JSON.stringify(currentLedger, null, 2);
                    fs.writeFileSync('ledger.json', data);

                    res.end(JSON.stringify({status : "Saved"}));
                })
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
