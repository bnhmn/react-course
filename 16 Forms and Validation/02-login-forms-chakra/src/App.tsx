import { Box, Flex, Heading } from '@chakra-ui/react';

import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { TabMenu } from './components/TabMenu';

export default function App() {
  return (
    <Flex direction="column" alignItems="center" my="10" bg="transparent">
      <Box id="header" mt="5" mb="10">
        <Heading size="xl">React Forms</Heading>
      </Box>
      <Box
        id="main"
        w="90%"
        maxW="40rem"
        mx="2rem"
        p={{ base: '2.0rem', sm: '2.5rem', md: '3rem' }}
        rounded="lg"
        boxShadow="2xl"
        bg="Background"
      >
        <TabMenu
          buttons={['Login', 'Signup']}
          content={(selected) => (
            <>
              {selected === 'Login' && <LoginForm />}
              {selected === 'Signup' && <SignupForm />}
            </>
          )}
        />
      </Box>
    </Flex>
  );
}
