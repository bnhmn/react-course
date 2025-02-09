import { Flex, Spinner, Text, VStack } from '@chakra-ui/react';

import { spinnerAccentColor } from '../theme';

export function LoadingSpinner() {
  return (
    <Flex height="100vh" align="center" justify="center" direction="column">
      <VStack spacing={6} position="relative" top="-10%">
        <Spinner boxSize="16" thickness="6px" speed="0.65s" color={spinnerAccentColor} />
        <Text fontSize="lg" fontWeight="medium">
          Loading...
        </Text>
      </VStack>
    </Flex>
  );
}
