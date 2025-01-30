import { useParams } from 'react-router';

import { Heading, Text } from '@chakra-ui/react';

import { Breadcrumbs } from '../../components/Breadcrumbs';

export function ViewEventPage() {
  const { eventId } = useParams();
  return (
    <>
      <Breadcrumbs />
      <Heading>Event Details</Heading>
      <Text>{eventId}</Text>
    </>
  );
}
