import { Header } from './components/Header.jsx';
import { Login } from './components/Login.jsx';
import { Signup } from './components/SignupViaInputBinding.jsx';
import { TabMenu } from './components/TabMenu.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <TabMenu
          buttons={['Login', 'Signup']}
          defaultSelected="Login"
          content={(selected) => (
            <>
              {selected === 'Login' && <Login />}
              {selected === 'Signup' && <Signup />}
            </>
          )}
        />
      </main>
    </>
  );
}
