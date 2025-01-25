import { Header } from './components/Header.jsx';
import { LoginFormControlled } from './components/LoginFormControlled.jsx';
import { LoginFormUncontrolled } from './components/LoginFormUncontrolled.jsx';
import { SignupFormControlled } from './components/SignupFormControlled.jsx';
import { SignupFormControlledRhf } from './components/SignupFormControlledRhf.jsx';
import { TabMenu } from './components/TabMenu.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <TabMenu
          buttons={['Login [uncon]', 'Login [con]', 'Signup [con]', 'Signup [rhf]']}
          content={(selected) => (
            <>
              {selected === 'Login [uncon]' && <LoginFormUncontrolled />}
              {selected === 'Login [con]' && <LoginFormControlled />}
              {selected === 'Signup [con]' && <SignupFormControlled />}
              {selected === 'Signup [rhf]' && <SignupFormControlledRhf />}
            </>
          )}
        />
      </main>
    </>
  );
}
