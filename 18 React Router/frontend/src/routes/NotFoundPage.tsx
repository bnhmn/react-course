import { Link } from 'react-router';

import { Button, Heading, Stack, Text } from '@chakra-ui/react';

export function NotFoundPage() {
  return (
    <Stack maxW="30rem" mt="10" gap="10">
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
