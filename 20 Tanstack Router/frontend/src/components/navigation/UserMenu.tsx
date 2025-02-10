import { FaSignInAlt, FaSignOutAlt, FaStar, FaUser } from 'react-icons/fa';

import { IconButton, Menu, MenuDivider, MenuList } from '@chakra-ui/react';
import { useLocation, useNavigate } from '@tanstack/react-router';

import { useAuth } from '../../lib/auth-context';
import { NavigationMenuButton } from './NavigationButtons';
import { UserMenuItem } from './UserMenuItem';

export function UserMenu() {
  const { isAuthenticated, startLogin, startLogout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
            <UserMenuItem label="Login" icon={<FaSignInAlt />} onClick={() => startLogin(location.href)} />
          </>
        )}
        {isAuthenticated && (
          <>
            <UserMenuItem label="My Account" icon={<FaUser />} onClick={() => navigate({ to: '/account' })} />
            <UserMenuItem label="Watchlist" icon={<FaStar />} onClick={() => navigate({ to: '/account/watchlist' })} />
            <MenuDivider />
            <UserMenuItem label="Logout" icon={<FaSignOutAlt />} onClick={() => startLogout()} />
          </>
        )}
      </MenuList>
    </Menu>
  );
}
