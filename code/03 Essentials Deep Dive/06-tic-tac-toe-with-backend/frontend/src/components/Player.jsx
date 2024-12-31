export function Player({ name, symbol, isActive, isOwnPlayer }) {
  const className = (isActive ? 'active ' : '') + (isOwnPlayer ? 'highlight ' : '');
  return (
    <li id={'player-' + symbol.toLowerCase()} className={className.trim()}>
      <span className="player">
        <span className="player-name">{name}</span>
        <span className="player-symbol">{symbol}</span>
      </span>
    </li>
  );
}
