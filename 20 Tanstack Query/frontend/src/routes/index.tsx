import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { createFileRoute, Link } from '@tanstack/react-router';

import { titleAccentColor } from '../theme';

// Routes can be defined via createFileRoute and createLazyFileRoute.
// Although the route path of a file route is automatically derived from the source code file path, we need
// to specify it explicitly as an argument to the function so that TypeScript knows that this path exists.
// Don't worry: the TanStack plugin will automatically adjust the path here when you move the file around.
// https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#anatomy-of-a-route

export const Route = createFileRoute('/')({
  component: () => {
    // https://chakra-templates.vercel.app/page-sections/hero
    return (
      <Container maxW="3xl">
        <Stack textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight="110%">
            Discover & Manage <br />
            <Text as="span" color={titleAccentColor}>
              Amazing Events
            </Text>
          </Heading>
          <Stack spacing="6">
            <Text fontSize="lg">
              Your go-to platform for discovering and managing exciting events! Whether you're looking for concerts,
              workshops, sports events, or local meetups, we’ve got you covered.
            </Text>
          </Stack>
          <Stack direction="column" spacing={3} align="center" alignSelf="center" position="relative">
            <Button as={Link} to="/events" rounded="full" px={6}>
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Container>
    );
  },
});
