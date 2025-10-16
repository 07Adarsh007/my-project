// server/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log(`✅ User Connected: ${socket.id}`);

  socket.on('send_message', (data) => {
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`❌ User Disconnected: ${socket.id}`);
  });
});

// Attempt to listen on PORT, and on EADDRINUSE try next ports up to a limit
const START_PORT = parseInt(process.env.PORT, 10) || 4000;
let currentPort = START_PORT;
const MAX_TRIES = 10;

function startListening(port) {
  server.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
  });
}

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.warn(`⚠️ Port ${currentPort} in use, trying port ${currentPort + 1}...`);
    currentPort += 1;
    if (currentPort - START_PORT > MAX_TRIES) {
      console.error(`❌ Could not find a free port after ${MAX_TRIES} attempts. Exiting.`);
      process.exit(1);
    } else {
      // small delay before retrying
      setTimeout(() => startListening(currentPort), 200);
    }
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});

// initial listen
startListening(currentPort);