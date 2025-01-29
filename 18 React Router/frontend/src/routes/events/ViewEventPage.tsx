import { useParams } from 'react-router';

import { Heading, Text } from '@chakra-ui/react';

export function ViewEventPage({}) {
  const { eventId } = useParams();
  return (
    <>
      <Heading>Event Details</Heading>
      <Text>{eventId}</Text>
    </>
  );
}
