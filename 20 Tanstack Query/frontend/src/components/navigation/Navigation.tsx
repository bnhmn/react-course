import { Stack } from '@chakra-ui/react';

import { headerBackground } from '../../theme';
import { DarkModeButton, NavigationButton } from './NavigationButtons';
import { useProgressbar } from './Progressbar';
import { UserMenu } from './UserMenu';

export function Navigation({ links }: { links: { [label: string]: string } }) {
  useProgressbar();
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
          <NavigationButton key={uri} uri={uri} label={label} />
        ))}
      </Stack>
      <Stack id="tools" direction="row" justifyContent="center" alignItems="center" gap="5">
        <UserMenu />
        <DarkModeButton />
      </Stack>
    </Stack>
  );
}
