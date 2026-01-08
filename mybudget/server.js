const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.url === '/budget') {
        let data = [];
        if (fs.existsSync('ledger.json'))
        {
            console.log("ledger.json exists");
            data = fs.readFileSync('ledger.json');
            
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
    } else { 
        res.end("Budget App Online");
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
