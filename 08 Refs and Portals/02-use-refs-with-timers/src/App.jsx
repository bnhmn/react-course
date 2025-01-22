import Player from './components/Player.jsx';
import { TimerChallenge } from './components/TimerChallenge.jsx';

export default function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge title="Easy" targetSeconds={1} />
        <TimerChallenge title="Medium" targetSeconds={5} />
        <TimerChallenge title="Tough" targetSeconds={10} />
        <TimerChallenge title="Hard" targetSeconds={15} />
      </div>
    </>
  );
}
