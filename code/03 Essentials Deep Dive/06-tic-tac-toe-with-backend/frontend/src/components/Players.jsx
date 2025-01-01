import { Player } from './Player';

export function Players({ players = {}, activePlayerNumber, ownPlayerNumber }) {
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
              isActive={activePlayerNumber === number}
              isOwnPlayer={ownPlayerNumber === number}
            />
          ))}
      </ol>
    </>
  );
}
