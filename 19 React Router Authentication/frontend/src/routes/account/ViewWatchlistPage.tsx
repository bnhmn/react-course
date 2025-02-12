import { useLoaderData } from 'react-router';

import { Heading, Text } from '@chakra-ui/react';

import { EventType } from '../../lib/backend';
import { ViewEvents } from '../events/ViewEvents';

export function ViewWatchlistPage() {
  const events = useLoaderData<EventType[]>()!;

  return (
    <>
      <Heading mb="10">Your Watchlist</Heading>
      {events.length > 0 && <ViewEvents events={events} />}
      {events.length === 0 && <Text fontSize="larger">Your watchlist is empty</Text>}
    </>
  );
}
