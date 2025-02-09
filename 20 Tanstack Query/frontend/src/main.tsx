import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { GenericErrorPage, NotFoundPage } from './components/ErrorPages.tsx';
import { LoadingSpinner } from './components/navigation/LoadingSpinner.tsx';
import { routeTree } from './routeTree.gen';
import { theme } from './theme.ts';

// TanStack Router is a fully type-safe router that integrates well with TanStack Query for better data fetching and
// caching. It favors a file-based routing approach, automatically generating the route tree from the ./routes folder.
// https://tanstack.com/router/latest/docs/framework/react/quick-start
// https://tanstack.com/router/latest/docs/framework/react/comparison

// Create a new router instance from the generated route tree
const router = createRouter({
  routeTree,
  defaultPendingComponent: LoadingSpinner,
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent: GenericErrorPage,
  // Don't show a loading spinner when navigating to other routes because we show our own navigation progress bar.
  // https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#showing-a-pending-component
  defaultPendingMs: Infinity,
  // Enables link preloading which can increase the perceived performance of the application with very little effort.
  // https://tanstack.com/router/latest/docs/framework/react/guide/navigation#link-preloading
  // defaultPreload: 'intent',
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  // Strict mode may cause issues with the login redirect
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
      {/* https://vite.dev/guide/env-and-mode https://tanstack.com/router/latest/docs/framework/react/devtools */}
      {import.meta.env.DEV && <TanStackRouterDevtools router={router} position="bottom-right" />}
    </ChakraProvider>
  </StrictMode>,
);
