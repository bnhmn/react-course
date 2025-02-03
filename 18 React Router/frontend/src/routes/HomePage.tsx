import { Heading, Image, Link, Text, useColorMode } from '@chakra-ui/react';

export function HomePage() {
  const { colorMode } = useColorMode();
  return (
    <>
      <Heading mb="16">Homepage</Heading>
      <Link href="https://reactrouter.com/en/6.29.0" target="_blank">
        <Image mb="16" maxW="25rem" src={`react-router-${colorMode}.svg`} alt="React logo" />
      </Link>
      <Text mb="16" maxW="50rem" fontSize="larger">
        Using react-router, you can simulate a multi-page application with React. <br />
        You can create multiple routes between which the user can navigate back and forth. <br />
        Click a link in the top menu to explore the content!
      </Text>
    </>
  );
}
