import { Form, useLocation } from 'react-router';

import { Button, Container, Heading, Stack } from '@chakra-ui/react';

import { authProvider, getReturnToUrlFromLocation } from '../lib/auth';

export function LoginPage() {
  const location = useLocation();
  const returnTo = getReturnToUrlFromLocation(location);
  return (
    <Container maxW="3xl">
      <Stack textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
        <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight="110%">
          Please Login
        </Heading>
        <Stack direction="column" spacing={3} align="center" alignSelf="center" position="relative">
          <Form method="POST">
            <input type="hidden" name="returnTo" value={returnTo} />
            <Button rounded="full" px={6} onClick={() => authProvider.login()}>
              Login
            </Button>
          </Form>
        </Stack>
      </Stack>
    </Container>
  );
}
