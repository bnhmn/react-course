import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';

import { findOpenGame } from './model/Game';
import { createPlayer } from './model/Player';

dotenv.config();

const port = parseInt(process.env.PORT || '8080');
const wss = new WebSocketServer({ port });

wss.on('connection', (ws) => {
  createPlayer({ ws, game: findOpenGame() });
});

wss.on('listening', () => {
  console.log(`Server is listening on ws://localhost:${port}`);
});
