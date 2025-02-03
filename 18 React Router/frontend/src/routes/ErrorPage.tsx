import { Link } from 'react-router';

import { Button, Heading, Stack, Text } from '@chakra-ui/react';

export function ErrorPage() {
  return (
    <Stack maxW="30rem" mt="10" gap="10">
      <Heading>Something went wrong.</Heading>
      <Text fontSize="larger">
        Sorry, we couldn't load the page you asked for 😕 <br />
        But you can click the button below to go back to the homepage.
      </Text>
      <Button as={Link} to="..">
        Home
      </Button>
    </Stack>
  );
}
