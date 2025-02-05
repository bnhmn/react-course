import { Link } from 'react-router';

import { Button, Heading, Stack, Text } from '@chakra-ui/react';

export function NotFoundPage() {
  return (
    <Stack direction="column" height="100%" maxW="30rem" position="relative" top="20%" gap="12">
      <Heading>UH OH! You're lost.</Heading>
      <Text fontSize="larger">
        The page you are looking for does not exist. How you got here is a mystery. But you can click the button below
        to go back to the homepage.
      </Text>
      <Button as={Link} to="/">
        Home
      </Button>
    </Stack>
  );
}
