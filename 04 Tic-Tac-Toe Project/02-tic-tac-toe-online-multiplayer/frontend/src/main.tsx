import './main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import { DarkModeBox } from './components/DarkModeBox';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <DarkModeBox>
        <App />
      </DarkModeBox>
    </ChakraProvider>
  </React.StrictMode>,
);
