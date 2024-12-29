import { useState } from 'react';

export function Player({ defaultName, symbol, isActive = false, onChangeName = (newName) => null }) {
  const [playerName, setPlayerName] = useState(defaultName);
  const [editMode, setEditMode] = useState(false);

  // If your new state depends on the previous state value, you should not update the state like this:
  //
  // const toggleEditMode = () => setEditMode(!editMode);
  //
  // Because when multiple pieces of your code toggle that state at around the same time,
  // React may batch them up and apply them all at once, leading to unexpected results.
  // Instead, pass a function to your state updating function. This way we always get the desired behaviour.
  // Note: State updates are not performed instantly but scheduled to be performed in the future
  // (when React has time for it, like a Garbage Collector).
  //
  const toggleEditMode = () => {
    setEditMode((isEditting) => !isEditting);
    onChangeName(playerName);
  };

  return (
    <li id={'player-' + symbol.toLowerCase()} className={isActive ? 'active' : null}>
      <span className="player">
        {editMode ? (
          // This is an example of binding an input field to a variable in React (two way binding).
          <input
            className="player-name"
            type="text"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            required
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={toggleEditMode}>{editMode ? 'Save' : 'Edit'}</button>
    </li>
  );
}
