import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { CatchNotFound, createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { NotFoundPage } from '../components/ErrorPages';
import { Navigation } from '../components/navigation/Navigation';
import { AuthContext } from '../lib/auth-context';

// The root route is the top-most route in the entire tree and encapsulates all other routes as children.
// It has no path, it is always matched, and its component is always rendered.
// https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#the-root-route

export const Route = createRootRouteWithContext<AuthContext>()({
  // Initialize the auth context before any page loads:
  // https://tanstack.com/router/latest/docs/framework/react/guide/router-context
  beforeLoad: async ({ context }) => await context.refreshAuthContext(),

  component: Component,
});

// The component must be defined as an extra function for Hot Module Reload (HMR) to work. HMR ensures that
// changes are immediately displayed in the browser. This won't work if you inline the component above.

function Component() {
  return (
    // https://v2.chakra-ui.com/docs/components/grid#template-areas
    <Grid
      minHeight="100vh"
      maxWidth="100vw"
      templateAreas={`
    "header"
    "main"
  `}
      gridTemplateRows={'70px 1fr'}
      gridTemplateColumns={'1fr'}
      gap="1"
    >
      <GridItem area={'header'}>
        <Navigation />
      </GridItem>
      <GridItem area={'main'}>
        <Flex as="main" direction="column" w="100%" p={{ base: 5, sm: 10 }} alignItems="center">
          {/* https://tanstack.com/router/latest/docs/framework/react/guide/not-found-errors#throwing-not-found-errors-in-components */}
          <CatchNotFound fallback={NotFoundPage} onCatch={(error) => console.log(error)}>
            {/* Outlet is the place where Tanstack Router inserts the child content */}
            <Outlet />
          </CatchNotFound>
        </Flex>
      </GridItem>
    </Grid>
  );
}
