import { Link } from 'react-router';

import { Button, Text } from '@chakra-ui/react';

export function NotFoundPage() {
  return (
    <>
      <Text fontSize="larger" mb="8">
        Page Not Found 🙁
      </Text>
      <Button as={Link} to="..">
        Go Back
      </Button>
    </>
  );
}
