import { useLoaderData } from 'react-router';

import { Heading, Text } from '@chakra-ui/react';

import { EventType } from '../../lib/backend';
import { ViewEvents } from './ViewEvents';

export function ViewEventsPage() {
  const events = useLoaderData<EventType[]>();

  return (
    <>
      <Heading mb="10">All Events</Heading>
      {events.length > 0 && <ViewEvents events={events} />}
      {events.length === 0 && <Text fontSize="larger">Currently, there are no events 🙁</Text>}
    </>
  );
}
