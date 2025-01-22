import { Header } from './components/Header.jsx';
import { LoginWithRef } from './components/LoginWithRef.jsx';
import { LoginCustom } from './components/LoginWithState.jsx';
import { Signup } from './components/SignupViaInputBinding.jsx';
import { TabMenu } from './components/TabMenu.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <TabMenu
          buttons={[, 'Login [native]', 'Login [custom]', 'Signup']}
          defaultSelected="Login [native]"
          content={(selected) => (
            <>
              {selected === 'Login [native]' && <LoginWithRef />}
              {selected === 'Login [custom]' && <LoginCustom />}
              {selected === 'Signup' && <Signup />}
            </>
          )}
        />
      </main>
    </>
  );
}
