import { ChakraTheme, extendTheme, ThemingProps, withDefaultColorScheme } from '@chakra-ui/react';
import { ColorProps } from '@chakra-ui/styled-system';

// Default color schemes: https://v2.chakra-ui.com/docs/styled-system/theme#alphas

export const colorScheme: ThemingProps['colorScheme'] = 'blue';
export const headerBackground = color('#0180CC');
export const headerTextColor = color('whitesmoke');
export const headerHiglight = color('rgba(144, 205, 244, 0.12)');
export const headerActive = color('whiteAlpha.300');

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
export function color(color: ColorProps['color']): ColorProps['color'] {
  return color;
}
