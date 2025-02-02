import { Heading, Image, Text } from '@chakra-ui/react';

export function HomePage() {
  return (
    <>
      <Heading mb="16">React Router Showcase</Heading>
      <Image maxW="20rem" src="/react-router.svg" alt="React logo" mb="16" />
      <Text fontSize="larger" mb="16">
        Welcome! Click a link in the top menu to explore the content! 🚀
      </Text>
    </>
  );
}
