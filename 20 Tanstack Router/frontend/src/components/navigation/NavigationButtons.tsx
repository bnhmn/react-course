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
import { Link } from '@tanstack/react-router';

import { headerActive, headerHiglight, headerTextColor } from '../../theme';

export function NavigationLink({ label, uri }: { label: string; uri: string }) {
  return (
    <Button
      /* This links to another route: https://tanstack.com/router/latest/docs/framework/react/guide/navigation */
      as={Link}
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
