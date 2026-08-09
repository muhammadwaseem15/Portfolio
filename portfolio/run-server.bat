@echo off
cd /d "E:\Project Site wSm\portfolio"
echo Starting server with error capture...
node -e "
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5173;
const DIST_DIR = path.join(__dirname, 'dist');

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION:', reason);
  process.exit(1);
});

const server = http.createServer((req, res) => {
  console.log('Request:', req.method, req.url);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Test Server Works</h1>');
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('Test server running at http://127.0.0.1:' + PORT);
});
"
pause