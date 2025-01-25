import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

import App from './App.tsx';

const theme = extendTheme(
  {
    styles: {
      global: {
        body: {
          bg: 'whitesmoke',
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'red' }),
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
);
