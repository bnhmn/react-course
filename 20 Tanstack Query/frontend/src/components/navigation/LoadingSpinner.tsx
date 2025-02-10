import { Flex, Spinner, Text, VStack } from '@chakra-ui/react';

import { spinnerAccentColor } from '../../theme';

export function LoadingSpinner() {
  return (
    <Flex
      position="fixed"
      top="40%" // Adjusted to place the spinner a bit higher than the center
      left="50%" // Centers horizontally on the page
      transform="translate(-50%, -50%)" // Ensures proper centering of the spinner
      direction="column"
      align="center"
      justify="center"
    >
      <VStack spacing={6}>
        <Spinner boxSize="16" thickness="6px" speed="0.65s" color={spinnerAccentColor} />
        <Text fontSize="lg" fontWeight="medium">
          Loading...
        </Text>
      </VStack>
    </Flex>
  );
}
