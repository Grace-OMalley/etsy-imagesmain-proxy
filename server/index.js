const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 3001;
const HOST = 'localhost';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Serve static files
app.use(express.static('client/dist'));

// Logging
app.use(morgan('dev'));

app.use(
  '/addtocart',
  createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true
  })
);

app.use(
  '/images',
  createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true
  })
);

app.use(
  '/findOne',
  createProxyMiddleware({
    target: 'http://localhost:1128',
    changeOrigin: true
  })
);

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});


