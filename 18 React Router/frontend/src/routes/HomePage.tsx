import { Heading, Image, Link, Text, useColorMode } from '@chakra-ui/react';

export function HomePage() {
  const { colorMode } = useColorMode();
  return (
    <>
      <Heading mb="12">Homepage</Heading>
      <Link href="https://reactrouter.com/home" target="_blank">
        <Image mb="12" maxW="25rem" src={`react-router-${colorMode}.svg`} alt="React logo" />
      </Link>
      <Text mb="12" maxW="50rem" fontSize="larger">
        Using react-router, you can simulate a multi-page application with React. <br />
        You can create multiple routes between which the user can navigate back and forth. <br />
        Click a link in the top menu to explore the content!
      </Text>

      <Text maxW="50rem" fontSize="larger"></Text>
    </>
  );
}
