const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 4000;

// Start server
server.listen(port, () => {
  console.log(`Server listening on port ${[port]}`);
});

// Routes
// app.use(express.static(path.join(__dirname, 'public')));

// A socket with namespace "connection" for new sockets
io.on('connection', socket => {
  console.log('a user connected');

  // Listen on a new namespace "new message"
  socket.on('new message', msg => {
    console.log(`Message received: ID: ${msg.id}, Message: ${msg.content}`);
    // Broadcast to all sockets including the one that sent the message
    io.emit('new message', msg);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});
