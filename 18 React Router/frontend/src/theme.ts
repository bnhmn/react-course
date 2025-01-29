import { ChakraTheme, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// const theme = extendTheme(withDefaultColorScheme({ colorScheme: 'orange' }));

export const headerBg = '#712cf9';
export const headerTextColor = 'whitesmoke';

export const theme = extendTheme(
  {
    config: {
      initialColorMode: 'system',
      useSystemColorMode: true,
    },
    styles: {
      global: (props: any) => ({
        body: {
          bg: mode('white', '#212529')(props),
        },
      }),
    },

    // Handle dark mode https://github.com/chakra-ui/chakra-ui/discussions/5273#discussioncomment-1864165
    // components: {
    //   Text: {
    //     baseStyle: (props: any) => ({
    //       color: mode('#091416', '#e9f4f6')(props),
    //     }),
    //   },
    //   Heading: {
    //     baseStyle: (props: any) => ({
    //       color: mode('#091416', '#e9f4f6')(props),
    //     }),
    //   },
    // },

    // https://www.realtimecolors.com/?colors=e9f4f6-010304-468faf-293566-403a92&fonts=Inter-Inter
    // colors: {
    //   text: {
    //     main: '#091416',
    //   },
    //   background: {
    //     main: '#fbfdfe',
    //     50: '#ebf5fa',
    //     100: '#d6ebf5',
    //     200: '#add6eb',
    //     300: '#85c2e0',
    //     400: '#5cadd6',
    //     500: '#3399cc',
    //     600: '#297aa3',
    //     700: '#1f5c7a',
    //     800: '#143d52',
    //     900: '#0a1f29',
    //   },
    //   primary: {
    //     main: '#509ab9',
    //     50: '#edf4f8',
    //     100: '#dbeaf0',
    //     200: '#b6d5e2',
    //     300: '#92c0d3',
    //     400: '#6dabc5',
    //     500: '#4995b6',
    //     600: '#3a7892',
    //     700: '#2c5a6d',
    //     800: '#1d3c49',
    //     900: '#0f1e24',
    //   },
    //   secondary: {
    //     main: '#99a5d6',
    //     50: '#edeff8',
    //     100: '#dbdff0',
    //     200: '#b6bfe2',
    //     300: '#929fd3',
    //     400: '#6d7fc5',
    //     500: '#495fb6',
    //     600: '#3a4c92',
    //     700: '#2c396d',
    //     800: '#1d2649',
    //     900: '#0f1324',
    //   },
    //   accent: {
    //     main: '#736dc5',
    //     50: '#ededf8',
    //     100: '#dcdbf0',
    //     200: '#b9b6e2',
    //     300: '#9692d3',
    //     400: '#736dc5',
    //     500: '#5049b6',
    //     600: '#403a92',
    //     700: '#302c6d',
    //     800: '#201d49',
    //     900: '#100f24',
    //   },
    // },
  } satisfies Partial<ChakraTheme>,
  withDefaultColorScheme({ colorScheme: 'purple' }),
);
