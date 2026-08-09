import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5173;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';",
};

function setSecurityHeaders(res) {
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
}

const server = http.createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    setSecurityHeaders(res);
    res.writeHead(204);
    res.end();
    return;
  }

  // Contact form API endpoint
  if (req.url === '/api/contact' && req.method === 'POST') {
    setCorsHeaders(res);
    setSecurityHeaders(res);
    
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('Contact form submission:', data);
        
        // In production, integrate with email service (SendGrid, Nodemailer, etc.)
        // For now, just return success
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Message received' }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid JSON' }));
      }
    });
    return;
  }

  // Static file serving
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Security: prevent directory traversal
  const resolvedPath = path.resolve(filePath);
  if (!resolvedPath.startsWith(path.resolve(DIST_DIR))) {
    setSecurityHeaders(res);
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  try {
    const content = await fs.promises.readFile(resolvedPath);
    setSecurityHeaders(res);
    res.setHeader('Content-Type', contentType);
    
    // Cache static assets for 1 year
    if (['.js', '.css', '.woff', '.woff2', '.svg', '.png', '.jpg', '.jpeg'].includes(ext)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    
    res.writeHead(200);
    res.end(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // SPA fallback - serve index.html for client-side routing
      if (!ext || ext === '.html') {
        try {
          const indexPath = path.join(DIST_DIR, 'index.html');
          const content = await fs.promises.readFile(indexPath);
          setSecurityHeaders(res);
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.writeHead(200);
          res.end(content);
        } catch {
          setSecurityHeaders(res);
          res.writeHead(500);
          res.end('Internal Server Error');
        }
      } else {
        setSecurityHeaders(res);
        res.writeHead(404);
        res.end('Not Found');
      }
    } else {
      console.error('Server error:', err);
      setSecurityHeaders(res);
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Serving static files from: ${DIST_DIR}`);
});