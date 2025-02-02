import { Box, DarkMode } from '@chakra-ui/react';

/**
 * Lock the color mode to `dark` for all child components, without any way to change it.
 */
export function DarkModeBox({ ...props }) {
  return (
    <DarkMode>
      {/* We need the box for the text colors to work properly: https://github.com/chakra-ui/chakra-ui/issues/6916 */}
      <Box data-theme="dark" color="chakra-body-text" {...props} />
    </DarkMode>
  );
}
