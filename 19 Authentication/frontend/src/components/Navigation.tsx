import 'nprogress/nprogress.css';
import './Navigation.css';

import NProgress from 'nprogress';
import { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { NavLink, useLocation, useNavigation } from 'react-router';

import { MoonIcon, StarIcon, SunIcon } from '@chakra-ui/icons';
import {
	Button,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	useColorMode,
} from '@chakra-ui/react';

import {
	headerActive,
	headerBg,
	headerHiglight,
	headerTextColor,
} from '../theme';

export function Navigation({ links }: { links: { [label: string]: string } }) {
  // https://v2.chakra-ui.com/docs/styled-system/color-mode
  const { colorMode, toggleColorMode } = useColorMode();
  const navigation = useNavigation();
  const location = useLocation();

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
      <Stack id="links" direction="row" justifyContent="center" alignItems="center" gap="1">
        {Object.entries(links).map(([label, uri]) => (
          /* Use NavLinks to link to other pages: https://reactrouter.com/start/library/navigating */
          <Button
            key={uri}
            as={NavLink}
            to={uri}
            variant="ghost"
            textColor={headerTextColor}
            _hover={{ background: headerHiglight }}
            _activeLink={{ background: headerActive }}
          >
            {label}
          </Button>
        ))}
      </Stack>
      <Stack id="tools" direction="row" justifyContent="center" alignItems="center" gap="5">
        {/* https://react-icons.github.io/react-icons/ */}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Account"
            icon={<FaUser />}
            variant="ghost"
            color={headerTextColor}
            background={location.pathname.startsWith('/account') ? headerActive : undefined}
            _hover={{ background: headerHiglight }}
            _active={{ background: headerActive }}
          />
          <MenuList>
            <MenuItem as={NavLink} to="/account" icon={<FaUser />}>
              My Account
            </MenuItem>
            <MenuItem as={NavLink} to="/account/watchlist" icon={<StarIcon />}>
              Watchlist
            </MenuItem>
          </MenuList>
        </Menu>

        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          variant="ghost"
          onClick={toggleColorMode}
          color={headerTextColor}
          _hover={{ background: headerHiglight }}
        />
      </Stack>
    </Stack>
  );
}
