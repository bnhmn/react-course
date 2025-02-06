import 'nprogress/nprogress.css';
import './Navigation.css';

import NProgress from 'nprogress';
import { useEffect } from 'react';
import { NavLink, useNavigation } from 'react-router';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, DarkMode, IconButton, Stack, useColorMode } from '@chakra-ui/react';

import { headerBg, headerTextColor } from '../theme';

export function Navigation({ links }: { links: { [label: string]: string } }) {
  // https://v2.chakra-ui.com/docs/styled-system/color-mode
  const { colorMode, toggleColorMode } = useColorMode();
  const navigation = useNavigation();

  // https://ricostacruz.com/nprogress https://www.npmjs.com/package/nprogress
  useEffect(() => {
    if (navigation.state === 'loading') {
      NProgress.start();
    } else {
      NProgress.done();
    }
    return () => {
      NProgress.done();
    };
  }, [navigation.state]);

  return (
    <Stack
      as="nav"
      direction="row"
      w="100%"
      h="70px"
      justifyContent="space-between"
      px={{ base: 6, md: 10 }}
      shadow="xl"
      bg={headerBg}
    >
      <DarkMode>
        <Stack id="links" direction="row" justifyContent="center" alignItems="center" gap="1">
          {Object.entries(links).map(([label, uri]) => (
            /* Use NavLinks to link to other pages: https://reactrouter.com/start/library/navigating */
            <Button
              key={uri}
              as={NavLink}
              to={uri}
              variant="ghost"
              textColor={headerTextColor}
              _activeLink={{ background: 'whiteAlpha.300' }}
            >
              {label}
            </Button>
          ))}
        </Stack>
        <Stack id="tools" direction="row" justifyContent="center" alignItems="center" gap="5">
          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            variant="ghost"
            onClick={toggleColorMode}
            aria-label="Toggle dark mode"
            color={headerTextColor}
          />
        </Stack>
      </DarkMode>
    </Stack>
  );
}
