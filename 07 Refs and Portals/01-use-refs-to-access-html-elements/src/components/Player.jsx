import { useRef, useState } from 'react';

export default function Player() {
  // Whenever a state value is changed via its setter function, React will re-execute and rerender the component.
  const [playerName, setPlayerName] = useState();

  // A ref is used to store values that do not cause rerendering when changed.
  // You can use it to reference and access HTML elements like the input field below.
  const playerNameInput = useRef();

  // The value of the reference can be accessed using 'playerNameInput.current'.
  // It is of type https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement.
  const handleSubmit = () => {
    setPlayerName(playerNameInput.current.value);
    // You could also manipulate the DOM this way, but this is a bit against the declarative philosophy of React.
    // playerNameInput.current.value = '';
  };

  return (
    <section id="player">
      <h2>Welcome {playerName ?? 'unknown entity'}!</h2>
      <p>
        <input ref={playerNameInput} type="text" />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
