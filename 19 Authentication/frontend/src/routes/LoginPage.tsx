import { Form, useLocation } from 'react-router';

import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react';

import { authProvider, extractReturnToUrl } from '../lib/auth';

export function LoginPage() {
  const location = useLocation();
  const returnTo = extractReturnToUrl(location);
  return (
    <Container maxW="3xl">
      <Stack textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
        <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight="110%">
          Please Login
        </Heading>
        <Stack spacing="6">
          <Text fontSize="lg">Please log in to access your account data.</Text>
        </Stack>
        <Stack direction="column" spacing={3} align="center" alignSelf="center" position="relative">
          <Form method="POST">
            <Button rounded="full" px={6} onClick={() => authProvider.startLogin(returnTo)}>
              Login
            </Button>
          </Form>
        </Stack>
      </Stack>
    </Container>
  );
}
