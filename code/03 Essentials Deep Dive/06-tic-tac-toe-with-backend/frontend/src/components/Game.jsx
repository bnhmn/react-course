import useWebSocket from 'react-use-websocket';
import { GameBoard } from './GameBoard';
import { GameLog } from './GameLog';
import { GameOver } from './GameOver';
import { Players } from './Players';

export function Game() {
  const socket = useWebSocket('ws://localhost:8080');
  const game = readGameState(socket);
  if (!game) {
    return; // Wait for WebSocket connection
  }
  console.log(game);
  const winner = game.players[game.winnerPlayerNumber];
  const ownPlayer = game.players[game.ownPlayerNumber];
  if (!ownPlayer?.ready) {
    socket.sendJsonMessage({ command: 'join', name: 'Max ' + ownPlayer?.number }); // TODO
  }
  console.log(winner);
  console.log(game.winnerPlayerNumber);

  return (
    <>
      <main id="game-container">
        <Players
          players={game.players}
          ownPlayerNumber={game.ownPlayerNumber}
          activePlayerNumber={game.activePlayerNumber}
        />
        <GameBoard
          gameTurns={game.turns}
          onSelectSquare={(rowNum, colNum) => socket.sendJsonMessage({ command: 'select', rowNum, colNum })}
          isActive={game.isRunning && game.activePlayerNumber === game.ownPlayerNumber}
        />
        {game.isGameOver && (
          <GameOver
            winner={winner}
            finished={game.isFinished}
            cancelled={game.isCancelled}
            onRematch={() =>
              socket.readyState === 1 ? socket.sendJsonMessage({ command: 'restart' }) : window.location.reload()
            }
          />
        )}
      </main>
      <GameLog gameTurns={game.turns} players={game.players} />
    </>
  );
}

function readGameState(webSocket) {
  try {
    const message = webSocket.lastJsonMessage;
    const { state, players, turns, ownPlayerNumber, activePlayerNumber, winnerPlayerNumber } = message;
    return {
      state,
      players,
      turns,
      ownPlayerNumber,
      activePlayerNumber,
      winnerPlayerNumber,
      isRunning: state === 'running',
      isFinished: state === 'finished',
      isCancelled: state === 'cancelled',
      isGameOver: state === 'finished' || state === 'cancelled',
    };
  } catch (error) {
    return null;
  }
}
