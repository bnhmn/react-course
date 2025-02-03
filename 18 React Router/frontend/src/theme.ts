import * as CSS from 'csstype';

import { ChakraTheme, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

export const headerBg = '#0180CC';
export const headerTextColor = 'whitesmoke';

export const theme = extendTheme(
  {
    config: {
      initialColorMode: 'system',
      useSystemColorMode: true,
    },
  } satisfies Partial<ChakraTheme>,
  withDefaultColorScheme({ colorScheme: 'blue' }),
);

/**
 * Provides color auto completion.
 */
export function color(color: CSS.Property.Color): CSS.Property.Color {
  return color;
}
