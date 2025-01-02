import './Lobby.css';

export function Lobby({ lobby }) {
  const { players } = lobby;
  return (
    <main id="game-container">
      <ul></ul>
      {players.map((player, index) => (
        <li key={index}>
          <span className="player">
            <span className="player-name">{player.name}</span>
          </span>
        </li>
      ))}
      <div className="spinner" />
    </main>
  );
}
