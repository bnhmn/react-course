import { Header } from './components/Header.jsx';
import { LoginFormCustom } from './components/LoginFormCustom.jsx';
import { LoginFormNative } from './components/LoginFormNative.jsx';
import { SignupFormCustom } from './components/SignupFormCustom.jsx';
import { SignupFormNative } from './components/SignupFormNative.jsx';
import { TabMenu } from './components/TabMenu.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <TabMenu
          buttons={['Login [native]', 'Login [custom]', 'Signup [native]', 'Signup [custom]']}
          defaultSelected="Login [native]"
          content={(selected) => (
            <>
              {selected === 'Login [native]' && <LoginFormNative />}
              {selected === 'Login [custom]' && <LoginFormCustom />}
              {selected === 'Signup [native]' && <SignupFormNative />}
              {selected === 'Signup [custom]' && <SignupFormCustom />}
            </>
          )}
        />
      </main>
    </>
  );
}
