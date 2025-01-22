import { Header } from './components/Header.jsx';
import { Login } from './components/Login.jsx';
import { Signup } from './components/Signup.jsx';
import { TabMenu } from './components/TabMenu.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <TabMenu
          buttons={['Signup', 'Login']}
          content={(selected) => (
            <>
              {selected === 'Signup' && <Signup />}
              {selected === 'Login' && <Login />}
            </>
          )}
        />
      </main>
    </>
  );
}
