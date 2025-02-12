import { MenuItem } from '@chakra-ui/react';

export function UserMenuItem({
  label,
  icon,

  onClick,
}: {
  label: string;
  icon: React.ReactElement;
  onClick?: () => void;
}) {
  return (
    <MenuItem icon={icon} onClick={onClick}>
      {label}
    </MenuItem>
  );
}
