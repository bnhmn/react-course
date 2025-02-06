import { NavLink } from 'react-router';

import { MenuItem } from '@chakra-ui/react';

export function UserMenuItem({
  label,
  icon,
  uri,
  onClick,
}: {
  label: string;
  icon: React.ReactElement;
  uri?: string;
  onClick?: () => void;
}) {
  return (
    <MenuItem as={uri ? NavLink : undefined} to={uri} icon={icon} onClick={onClick}>
      {label}
    </MenuItem>
  );
}
