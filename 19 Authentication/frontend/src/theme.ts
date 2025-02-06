import * as CSS from 'csstype';

import { ChakraTheme, extendTheme, ThemingProps, withDefaultColorScheme } from '@chakra-ui/react';

export const headerBg = '#0180CC';
export const headerTextColor = 'whitesmoke';
export const colorScheme: ThemingProps['colorScheme'] = 'blue';

export const theme = extendTheme(
  {
    config: {
      initialColorMode: 'system',
      useSystemColorMode: true,
    },
  } satisfies Partial<ChakraTheme>,
  withDefaultColorScheme({ colorScheme }),
);

/**
 * Provides color auto completion.
 */
export function color(color: CSS.Property.Color): CSS.Property.Color {
  return color;
}
