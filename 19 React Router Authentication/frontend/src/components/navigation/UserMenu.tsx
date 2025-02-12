import { FaSignInAlt, FaSignOutAlt, FaStar, FaUser } from 'react-icons/fa';

import { IconButton, Menu, MenuDivider, MenuList } from '@chakra-ui/react';

import { authProvider, useAuthContext } from '../../lib/auth';
import { NavigationMenuButton } from './NavigationButtons';
import { UserMenuItem } from './UserMenuItem';

export function UserMenu() {
  const { isAuthenticated } = useAuthContext();

  return (
    <Menu>
      <NavigationMenuButton
        as={IconButton}
        aria-label="Account"
        icon={<FaUser />}
        isActive={location.pathname.startsWith('/account')}
      />
      <MenuList>
        {!isAuthenticated && (
          <>
            <UserMenuItem label="Login" icon={<FaSignInAlt />} onClick={() => authProvider.startLogin()} />
          </>
        )}
        {isAuthenticated && (
          <>
            <UserMenuItem label="My Account" icon={<FaUser />} uri="/account" />
            <UserMenuItem label="Watchlist" icon={<FaStar />} uri="/account/watchlist" />
            <MenuDivider />
            <UserMenuItem label="Logout" icon={<FaSignOutAlt />} onClick={() => authProvider.startLogout()} />
          </>
        )}
      </MenuList>
    </Menu>
  );
}
