import { Link } from 'react-router';

import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react';

export function ErrorPage({ title, description }: { title: string; description: string }) {
  // https://chakra-templates.vercel.app/page-sections/hero
  return (
    <Container maxW="3xl">
      <Stack textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
        <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight="110%">
          {title}
        </Heading>
        <Stack spacing="6">
          <Text whiteSpace="pre-line">{description.trim()}</Text>
        </Stack>
        <Stack direction="column" spacing={3} align="center" alignSelf="center" position="relative">
          <Button as={Link} to="/" rounded="full" px={6}>
            Home
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
