import { Heading, Text } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';

import { EventsGrid } from '../components/events/EventsGrid';
import { fetchWatchingEvents } from '../lib/backend';

export const Route = createFileRoute('/account/watchlist')({
  loader: async () => await fetchWatchingEvents(),

  component: function Component() {
    const events = Route.useLoaderData();

    return (
      <>
        <Heading mb="10">Your Watchlist</Heading>
        {events.length > 0 && <EventsGrid events={events} />}
        {events.length === 0 && <Text fontSize="larger">Your watchlist is empty</Text>}
      </>
    );
  },
});
