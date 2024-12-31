import { Player } from './Player';

export function Players({ players = {}, ownPlayerNumber, activePlayerNumber }) {
  return (
    <ol id="players">
      {players.map(({ number, symbol, name }) => (
        <Player
          key={symbol}
          symbol={symbol}
          name={name}
          isOwnPlayer={ownPlayerNumber === number}
          isActive={activePlayerNumber === number}
        />
      ))}
    </ol>
  );
}
