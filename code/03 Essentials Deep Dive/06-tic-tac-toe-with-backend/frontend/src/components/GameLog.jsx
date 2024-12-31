export function GameLog({ gameTurns = [], players = [], reversed = true }) {
  let logEntries = createLogEntries(gameTurns, players).map((entry, index) => <li key={index}>{entry}</li>);
  if (reversed) {
    logEntries.reverse();
  }
  return <ol id="log">{logEntries}</ol>;
}

function createLogEntries(gameTurns, players) {
  return gameTurns.map(({ rowNum, colNum, symbol }) => {
    const player = players.filter((player) => player.symbol === symbol)[0];
    return `${player.name} selected (${rowNum},${colNum})`;
  });
}
