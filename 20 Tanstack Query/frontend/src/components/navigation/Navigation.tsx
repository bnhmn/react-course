import { Stack } from '@chakra-ui/react';
import { useRouterState } from '@tanstack/react-router';

import { headerBackground } from '../../theme';
import { DarkModeButton, NavigationLink } from './NavigationButtons';
import { useProgressBar } from './ProgressBar';
import { UserMenu } from './UserMenu';

export function Navigation({ links = { Home: '/', Events: '/events' } }: { links?: { [label: string]: string } }) {
  const { isLoading } = useRouterState();
  useProgressBar(isLoading);
  return (
    <Stack
      as="nav"
      direction="row"
      w="100%"
      h="70px"
      justifyContent="space-between"
      px={{ base: 6, md: 10 }}
      shadow="xl"
      bg={headerBackground}
    >
      <Stack id="links" direction="row" justifyContent="center" alignItems="center" gap="1">
        {Object.entries(links).map(([label, uri]) => (
          <NavigationLink key={uri} uri={uri} label={label} />
        ))}
      </Stack>
      <Stack id="tools" direction="row" justifyContent="center" alignItems="center" gap="5">
        <UserMenu />
        <DarkModeButton />
      </Stack>
    </Stack>
  );
}
