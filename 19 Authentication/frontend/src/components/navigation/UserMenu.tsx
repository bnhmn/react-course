import { FaSignInAlt, FaSignOutAlt, FaStar, FaUser } from 'react-icons/fa';

import { IconButton, Menu, MenuDivider, MenuList } from '@chakra-ui/react';

import { authProvider } from '../../lib/auth';
import { NavigationMenuButton } from './NavigationButtons';
import { UserMenuItem } from './UserMenuItem';

export function UserMenu() {
  // Auth0 is an identity provider: https://auth0.com/pricing
  //   const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const isAuthenticated = true;

  return (
    <Menu>
      <NavigationMenuButton
        as={IconButton}
        aria-label="Account"
        icon={<FaUser />}
        isActive={location.pathname.startsWith('/account')}
      />
      <MenuList>
        {!isAuthenticated ||
          // TODO: REMOVE
          (true && (
            <>
              <UserMenuItem label="Login" icon={<FaSignInAlt />} onClick={() => authProvider.login()} />
            </>
          ))}
        {isAuthenticated && (
          <>
            <UserMenuItem label="My Account" icon={<FaUser />} uri="/account" />
            <UserMenuItem label="Watchlist" icon={<FaStar />} uri="/account/watchlist" />
            <MenuDivider />
            <UserMenuItem label="Logout" icon={<FaSignOutAlt />} onClick={() => authProvider.logout()} />
          </>
        )}
      </MenuList>
    </Menu>
  );
}
