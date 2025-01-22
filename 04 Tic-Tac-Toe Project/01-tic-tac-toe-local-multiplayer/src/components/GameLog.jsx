export function GameLog({ gameTurns = [], reversed = true }) {
  let logEntries = createLogEntries(gameTurns).map((entry, index) => <li key={index}>{entry}</li>);
  if (reversed) {
    logEntries.reverse();
  }
  return <ol id="log">{logEntries}</ol>;
}

function createLogEntries(gameTurns) {
  return gameTurns.map(({ rowNum, colNum, symbol }) => `Player ${symbol} selected (${rowNum},${colNum})`);
}
