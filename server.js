const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = process.env.URL || '127.0.0.1';
const port = process.env.PORT || 3000;

const getMimeType = extension => {
  let mimeType = 'text/html';

  switch (extension) {
    case '.js':
      mimeType = 'text/javascript';
      break;
    case '.css':
      mimeType = 'text/css';
      break;
    case '.json':
      mimeType = 'application/json';
      break;
    case '.png':
      mimeType = 'image/png';
      break;
    case '.jpg':
      mimeType = 'image/jpg';
      break;
  }  

  return mimeType;
};

const getCacheControl = extension => {
  let cache = 'no-cache';

  switch (extension) {
    case '.js':
    case '.json':
      cache = 'no-cache';
      break;
    case '.css':
    case '.png':
    case '.jpg':
      cache = 'public, max-age=3600, must-revalidate';
      break;
  }  

  return cache;
};

const getFile = (filePath, response, mimeType, cache) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // page not found
        fs.readFile(
          path.join(__dirname, 'public', '404.html'),
          (err, html) => {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end(html, 'utf8');
        });
      } else {
        // other server error
        response.writeHead(500);
        response.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      // response.writeHead(200, { 'Content-Type': mimeType });
      response.writeHead(200, { 'Content-Type': mimeType, 'Cache-Control': cache });
      response.end(data, 'utf8');
    }
  })
};

const requestHandler = (req, res) => {
  const filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url
  );

	const ext = path.extname(filePath);

  let mimeType = getMimeType(ext);
  let cache = getCacheControl(ext);

  getFile(filePath,res,mimeType,cache);
};

const server = http.createServer(requestHandler);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
