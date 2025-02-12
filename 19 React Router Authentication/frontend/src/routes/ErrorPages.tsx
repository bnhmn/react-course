import { Link } from 'react-router';

import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react';

export function GenericErrorPage() {
  return (
    <ErrorPage
      title="Something went wrong."
      description={`
        Sorry, we couldn't load the page you asked for 😕
        But you can click the button below to go back to the homepage.`}
    />
  );
}

export function NotFoundPage() {
  return (
    <ErrorPage
      title="UH OH! You're lost."
      description={`
        The page you are looking for does not exist. How you got here is a mystery.
        But you can click the button below to go back to the homepage.`}
    />
  );
}

export function LoginErrorPage() {
  return (
    <ErrorPage
      title="Login failed"
      description={`
        Sorry, we couldn't log you in 😕
        Please try again later.`}
    />
  );
}

function ErrorPage({ title, description }: { title: string; description: string }) {
  // https://chakra-templates.vercel.app/page-sections/hero
  return (
    <Container maxW="3xl">
      <Stack textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
        <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight="110%">
          {title}
        </Heading>
        <Stack spacing="6">
          <Text fontSize="lg" whiteSpace="pre-line">
            {description.trim()}
          </Text>
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
