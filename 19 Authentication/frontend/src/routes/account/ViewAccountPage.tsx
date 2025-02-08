import { Avatar, Badge, Box, Divider, Flex, Heading, Text, VStack } from '@chakra-ui/react';

import { useAuthContext } from '../../lib/auth';

export function ViewAccountPage() {
  const { user } = useAuthContext();

  return (
    <>
      <Heading mb="10">Your Account</Heading>
      <Box minW="22rem" maxW="30rem" p={6} borderWidth={1} borderRadius="lg" boxShadow="md" mx="auto">
        <Flex direction="column" align="center" gap={2}>
          <>
            <Avatar size="xl" name={user.name} src={user.picture} mb={4} />
            <Text fontSize="xl" fontWeight="bold">
              {user.given_name || user.name} {user.family_name}
            </Text>
            {user.nickname && <Text color="gray.500">(@{user.nickname})</Text>}
            <Divider my={4} />
            <VStack align="start" spacing={2} w="full">
              <Text fontStyle="s">
                <strong>Email:</strong> {user.email}
              </Text>
              {user.email_verified && <Badge colorScheme="green">Verified</Badge>}
              {user.phone_number && (
                <Text>
                  <strong>Phone:</strong> {user.phone_number}
                </Text>
              )}
            </VStack>
          </>
        </Flex>
      </Box>
    </>
  );
}
