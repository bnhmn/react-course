import { StarIcon, useColorModeValue } from '@chakra-ui/icons';

import { colorScheme } from '../theme';

export function WatchIcon({ active = false }) {
  const activeColor = useColorModeValue(`${colorScheme}.600`, `${colorScheme}.200`);
  const inactiveColor = useColorModeValue(`${colorScheme}.100`, `${colorScheme}.700`);
  return <StarIcon color={active ? activeColor : inactiveColor} />;
}
