import { Outlet } from 'react-router';

import { Flex, Grid, GridItem } from '@chakra-ui/react';

import { Navigation } from './Navigation';

interface RootLayoutProps {
  links: { [label: string]: string };
}

export function RootLayout({ links }: RootLayoutProps) {
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
        <Navigation links={links} />
      </GridItem>
      <GridItem area={'main'}>
        <Flex as="main" direction="column" w="100%" p={{ base: 5, sm: 10 }} alignItems="center">
          {/* Outlet is the place where React Router inserts the child content */}
          {/* https://reactrouter.com/start/library/routing#nested-routes */}
          <Outlet />
        </Flex>
      </GridItem>
    </Grid>
  );
}
