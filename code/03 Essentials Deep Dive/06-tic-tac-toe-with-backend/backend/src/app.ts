import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';

import { PlayerConnection } from './model/Player';

dotenv.config();

const port = parseInt(process.env.PORT || '8080');
const wss = new WebSocketServer({ port });

wss.on('connection', (ws) => {
  PlayerConnection.create(ws);
});

wss.on('listening', () => {
  console.log(`Server is listening on ws://localhost:${port}`);
});
