import { Header } from './components/Header.jsx';
import { LoginFormControlled } from './components/LoginFormControlled.jsx';
import { LoginFormUncontrolled } from './components/LoginFormUncontrolled.jsx';
import { SignupFormControlled } from './components/SignupFormControlled.jsx';
import { SignupFormControlledRhf } from './components/SignupFormControlledRhf.jsx';
import { SignupFormUncontrolled } from './components/SignupFormUncontrolled.jsx';
import { TabMenu } from './components/TabMenu.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <TabMenu
          buttons={['Login [u]', 'Login [c]', 'Signup [u]', 'Signup [c]', 'Signup [rhf]']}
          defaultSelected="Login [u]"
          content={(selected) => (
            <>
              {selected === 'Login [u]' && <LoginFormUncontrolled />}
              {selected === 'Login [c]' && <LoginFormControlled />}
              {selected === 'Signup [u]' && <SignupFormUncontrolled />}
              {selected === 'Signup [c]' && <SignupFormControlled />}
              {selected === 'Signup [rhf]' && <SignupFormControlledRhf />}
            </>
          )}
        />
      </main>
    </>
  );
}
