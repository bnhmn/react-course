import { Heading, Image, Text, useColorMode } from '@chakra-ui/react';

import { Breadcrumbs } from '../components/Breadcrumbs';

export function HomePage() {
  const { colorMode } = useColorMode();
  return (
    <>
      <Breadcrumbs />
      <Heading mb="12">React Router Showcase</Heading>
      <Image mb="12" maxW="25rem" src={`react-router-${colorMode}.svg`} alt="React logo" />
      <Text fontSize="larger">Click a link in the top menu to explore the content! 🚀</Text>
    </>
  );
}
