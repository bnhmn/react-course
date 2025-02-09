import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { Navigation } from '../components/navigation/Navigation';

// The root route is the top-most route in the entire tree and encapsulates all other routes as children.
// It has no path, it is always matched, and its component is always rendered.
// https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#the-root-route

export const Route = createRootRoute({
  component: () => (
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
          {/* Outlet is the place where Tanstack Router inserts the child content */}
          <Outlet />
        </Flex>
      </GridItem>
    </Grid>
  ),
});
