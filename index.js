const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'chat3.html'));
});

// this will emit the event to all connected sockets
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

io.on('connect', function () {
  console.log('A user connected');
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

