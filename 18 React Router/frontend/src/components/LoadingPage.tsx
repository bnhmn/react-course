import { Spinner, Stack, Text } from '@chakra-ui/react';

export function LoadingPage() {
  return (
    <Stack w="100vw" h="100vh" maxH="50rem" direction="column" justifyContent="center" alignItems="center" gap="6">
      <Spinner size="xl" />
      <Text fontSize="large">Loading, please wait...</Text>
    </Stack>
  );
}
