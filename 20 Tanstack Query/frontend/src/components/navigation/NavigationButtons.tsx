import { NavLink } from 'react-router';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  MenuButton,
  MenuButtonProps,
  useColorMode,
} from '@chakra-ui/react';

import { headerActive, headerHiglight, headerTextColor } from '../../theme';

export function NavigationButton({ label, uri }: { label: string; uri: string }) {
  return (
    <Button
      /* Use NavLinks to link to other pages: https://reactrouter.com/start/library/navigating */
      as={NavLink}
      to={uri}
      variant="ghost"
      textColor={headerTextColor}
      _hover={{ background: headerHiglight }}
      _activeLink={{ background: headerActive }}
    >
      {label}
    </Button>
  );
}

export function NavigationIconButton(props: IconButtonProps) {
  return (
    <IconButton
      variant="ghost"
      color={headerTextColor}
      background={props.isActive ? headerActive : undefined}
      _hover={{ background: headerHiglight }}
      _active={{ background: headerActive }}
      {...props}
    />
  );
}

export function NavigationMenuButton({ as, ...props }: MenuButtonProps & IconButtonProps & ButtonProps) {
  return (
    <MenuButton
      as={as}
      variant="ghost"
      color={headerTextColor}
      background={props.isActive ? headerActive : undefined}
      _hover={{ background: headerHiglight }}
      _active={{ background: headerActive }}
      {...props}
    />
  );
}

export function DarkModeButton() {
  // https://v2.chakra-ui.com/docs/styled-system/color-mode
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <NavigationIconButton
      aria-label="Toggle dark mode"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
    />
  );
}
