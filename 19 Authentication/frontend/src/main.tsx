import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App.tsx';
import { theme } from './theme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      {/* Auth0 is an identity provider: https://auth0.com/pricing https://github.com/auth0/auth0-react */}
      <Auth0Provider
        domain="bnhmn.eu.auth0.com"
        clientId="Pbw3Z7K1Z1sSbZixbcH6rvWqn79CBd1t"
        authorizationParams={{ redirect_uri: window.location.origin }}
        onRedirectCallback={(appState) => {
          window.location.replace(appState?.returnTo || window.location.pathname);
        }}
      >
        <App />
      </Auth0Provider>
    </ChakraProvider>
  </StrictMode>,
);
