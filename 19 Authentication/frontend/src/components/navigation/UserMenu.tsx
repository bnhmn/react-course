import { FaSignInAlt, FaSignOutAlt, FaStar, FaUser } from 'react-icons/fa';

import { useAuth0 } from '@auth0/auth0-react';
import { IconButton, Menu, MenuDivider, MenuList } from '@chakra-ui/react';

import { NavigationMenuButton } from './NavigationButtons';
import { UserMenuItem } from './UserMenuItem';

export function UserMenu() {
  // Auth0 is an identity provider: https://auth0.com/pricing
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  // See https://github.com/auth0/auth0-react/blob/main/EXAMPLES.md
  const handleLogin = () => {
    loginWithRedirect({ appState: { returnTo: window.location.href } });
  };
  const handleLogout = () => {
    logout();
  };

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
            <UserMenuItem label="Login" icon={<FaSignInAlt />} onClick={handleLogin} />
          </>
        )}
        {isAuthenticated && (
          <>
            <UserMenuItem label="My Account" icon={<FaUser />} uri="/account" />
            <UserMenuItem label="Watchlist" icon={<FaStar />} uri="/account/watchlist" />
            <MenuDivider />
            <UserMenuItem label="Logout" icon={<FaSignOutAlt />} onClick={handleLogout} />
          </>
        )}
      </MenuList>
    </Menu>
  );
}
