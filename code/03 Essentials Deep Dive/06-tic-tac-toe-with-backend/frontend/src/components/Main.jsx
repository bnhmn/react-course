import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Game } from './Game';
import { Lobby } from './Lobby';
import { Preferences } from './Preferences';

export function Main() {
  const { lastJsonMessage: message, sendJsonMessage, readyState } = useWebSocket('ws://localhost:8080');
  const socketOpen = readyState === ReadyState.OPEN;
  if (!message) {
    return; // Wait for message from backend
  }
  const type = message.type;
  return (
    <>
      {type === 'connected' && (
        <Preferences onJoinGame={({ name, gridSize }) => sendJsonMessage({ command: 'join', name, gridSize })} />
      )}
      {type === 'lobby' && <Lobby lobby={message} />}
      {type === 'game' && (
        <Game
          game={message}
          onSelectSquare={(rowNum, colNum) => sendJsonMessage({ command: 'select', rowNum, colNum })}
          onRematch={() => (socketOpen ? sendJsonMessage({ command: 'restart' }) : window.location.reload())}
        />
      )}
    </>
  );
}
