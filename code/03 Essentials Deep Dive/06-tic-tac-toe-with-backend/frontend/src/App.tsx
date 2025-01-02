import useWebSocket, { ReadyState } from 'react-use-websocket';

import { Game } from './components/Game';
import { GameLog } from './components/GameLog';
import { Lobby } from './components/Lobby';
import { Preferences } from './components/Preferences';
import { MessageType } from './types/Message';

export default function App() {
  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket('ws://localhost:8080');
  const socketOpen = readyState === ReadyState.OPEN;
  const message = lastJsonMessage as MessageType;
  if (!message) {
    return; // Wait for message from backend
  }
  return (
    <>
      <main id="game-container">
        {message.type === 'connected' && (
          <Preferences onJoinGame={(name, gridSize) => sendJsonMessage({ command: 'join', name, gridSize })} />
        )}
        {message.type === 'lobby' && <Lobby lobby={message} />}
        {message.type === 'game' && (
          <Game
            game={message}
            onSelectSquare={(rowNum, colNum) => sendJsonMessage({ command: 'select', rowNum, colNum })}
            onRematch={() => (socketOpen ? sendJsonMessage({ command: 'restart' }) : window.location.reload())}
          />
        )}
      </main>
      {message.type === 'game' && <GameLog game={message} />}
    </>
  );
}
