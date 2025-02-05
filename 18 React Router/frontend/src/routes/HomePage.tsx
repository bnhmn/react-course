import { Link } from 'react-router';

import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react';

import { color } from '../theme';

export function HomePage({ accentColor = color('blue.500') }) {
  // https://chakra-templates.vercel.app/page-sections/hero
  return (
    <Container maxW="3xl">
      <Stack textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
        <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight="110%">
          Discover & Manage <br />
          <Text as="span" color={accentColor}>
            Amazing Events
          </Text>
        </Heading>
        <Stack spacing="6">
          <Text>
            Your go-to platform for discovering and managing exciting events! Whether you're looking for concerts,
            workshops, sports events, or local meetups, we’ve got you covered.
          </Text>
          <Text>Join now and never miss out on an amazing experience again!</Text>
        </Stack>

        <Stack direction="column" spacing={3} align="center" alignSelf="center" position="relative">
          <Button as={Link} to="/events" rounded="full" px={6}>
            Get Started
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
