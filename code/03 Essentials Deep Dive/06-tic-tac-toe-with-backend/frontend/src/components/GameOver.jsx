export function GameOver({ winner, finished = true, cancelled = false, onRematch = () => null }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {finished && winner && <p>{winner.name} won!</p>}
      {finished && !winner && <p>It's a draw!</p>}
      {cancelled && <p>The game was cancelled 🙁</p>}
      <p>
        <button onClick={onRematch}>Rematch</button>
      </p>
    </div>
  );
}
