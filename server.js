const http = require('http');
const app = require('./app');
const ports = require('./config/ports');

const port = process.env.PORT || ports.DX_CHATBOX_RENDERER;
const server = http.createServer(app);
server.listen(port);