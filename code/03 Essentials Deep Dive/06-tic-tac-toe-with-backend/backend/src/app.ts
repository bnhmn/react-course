import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

import { PlayerConnection } from './model/Player';

dotenv.config();

const port = parseInt(process.env.PORT || '80');
const server = createServer();

// Use Express to serve frontend files from public folder
const app = express();
app.use(express.static('public'));
server.on('request', app);

// Use Websocket to serve backend
const wss = new WebSocketServer({ server });
wss.on('connection', (ws) => {
  PlayerConnection.create(ws);
});

// Run both on the same HTTP server
server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
  console.log(`Server is listening on ws://localhost:${port}`);
});
