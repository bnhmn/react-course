import { z } from 'zod';

import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';

import { authProvider } from '../lib/auth';

export const Route = createFileRoute('/login')({
  // https://tanstack.com/router/latest/docs/framework/react/guide/search-params#validating-search-params
  validateSearch: z.object({
    returnTo: z.string().default('/'),
  }),

  component: function Component() {
    const { returnTo } = Route.useSearch();

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
            <Button rounded="full" px={6} onClick={() => authProvider.startLogin(returnTo)}>
              Login
            </Button>
          </Stack>
        </Stack>
      </Container>
    );
  },
});
