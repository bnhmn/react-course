import { createRoot } from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react';

import App from './App.tsx';
import { theme } from './theme.ts';

createRoot(document.getElementById('root')!).render(
  // Strict mode is not enabled because it causes issues with the login redirect
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
);
