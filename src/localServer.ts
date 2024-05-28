import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, '..', 'index.html');
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
