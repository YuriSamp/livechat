import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connection', (socket) => {
  socket.on('new message', (message) => {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message,
    });
  });

  socket.on('add user', (username) => {
    socket.username = username;
    socket.broadcast.emit('user joined', {
      username: socket.username,
    });
  });
});

httpServer.listen(8000);
