import { Player } from './Player';

export function Players({ players = {}, activeSymbol, onChange = (newPlayers) => null }) {
  const handleNameChange = (playerSymbol, newPlayerName) => {
    const newPlayers = { ...players, [playerSymbol]: newPlayerName };
    onChange(newPlayers);
  };

  return (
    <ol id="players">
      {Object.entries(players).map(([symbol, name]) => (
        <Player
          key={symbol}
          symbol={symbol}
          defaultName={name}
          isActive={activeSymbol === symbol}
          onChangeName={(newName) => handleNameChange(symbol, newName)}
        />
      ))}
    </ol>
  );
}
