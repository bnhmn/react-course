import { Link } from 'react-router';

import { Button, Heading, Stack, Text } from '@chakra-ui/react';

export function ErrorPage() {
  return (
    <Stack direction="column" height="100%" maxW="30rem" position="relative" top="20%" gap="12">
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
