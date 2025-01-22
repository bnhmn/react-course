import { Header } from './components/Header.jsx';
import { Login } from './components/Login.jsx';
import { SignupViaFormData } from './components/SignupViaFormData.jsx';
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
              {selected === 'Signup' && <SignupViaFormData />}
              {selected === 'Login' && <Login />}
            </>
          )}
        />
      </main>
    </>
  );
}
