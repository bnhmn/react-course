import { MenuItem } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

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
    <MenuItem as={uri ? Link : undefined} to={uri} icon={icon} onClick={onClick}>
      {label}
    </MenuItem>
  );
}
