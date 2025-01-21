import { useBackend } from './backend/hooks/useBackend';
import { Game } from './components/Game';
import { GameLog } from './components/GameLog';
import { Lobby } from './components/Lobby';
import { Preferences } from './components/Preferences';

export default function App() {
  const { message, sendMessage } = useBackend();
  return (
    <>
      <header>
        <h1>Tic-Tac-Toe</h1>
      </header>
      <main id="game-container">
        {message?.type === 'connected' && (
          <Preferences onJoinGame={(name, gridSize) => sendMessage({ command: 'join', name, gridSize })} />
        )}
        {message?.type === 'lobby' && <Lobby lobby={message} />}
        {message?.type === 'game' && (
          <Game
            game={message}
            onSelectSquare={(rowNum, colNum) => sendMessage({ command: 'select', rowNum, colNum })}
            onRematch={() => sendMessage({ command: 'restart' })}
          />
        )}
      </main>
      {message?.type === 'game' && <GameLog game={message} disabled />}
    </>
  );
}
