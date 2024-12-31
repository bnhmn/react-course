import { Player } from './Player';

export function Players({ players = {}, ownPlayerNumber, activePlayerNumber }) {
  return (
    <>
      <ol id="players">
        {players
          .toSorted((p1, p2) => (p1.number === ownPlayerNumber ? -1 : 0))
          .map(({ number, symbol, name }) => (
            <Player
              key={symbol}
              symbol={symbol}
              name={name}
              isOwnPlayer={ownPlayerNumber === number}
              isActive={activePlayerNumber === number}
            />
          ))}
      </ol>
    </>
  );
}
