import { AddIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { EventsGrid } from '../components/events/EventsGrid';
import { useAuthContext } from '../lib/auth';
import { fetchEvents } from '../lib/backend';

// This is an index route. It is displayed when the user visits the /events page, but not one of its subpages.
// https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing#flat-routes

export const Route = createFileRoute('/events/')({
  // We can fetch data through a loader. TanStack executes the loader before rendering the component.
  // It caches the loader result, which makes subsequent page views significantly faster.
  // If a result is cached, it will be returned immediately, then potentially be refetched in the background.
  // https://tanstack.com/router/latest/docs/framework/react/guide/data-loading
  loader: async () => await fetchEvents(),

  component: function Component() {
    const navigate = useNavigate();
    const events = Route.useLoaderData();
    const { isAuthenticated } = useAuthContext();

    return (
      <>
        <Flex width="100%" justifyContent="center" alignItems="center" gap="6" mb="10">
          <Heading>All Events</Heading>
          {isAuthenticated && (
            <IconButton
              icon={<AddIcon />}
              size="md"
              rounded="3xl"
              aria-label="Create event"
              onClick={() => navigate({ to: '/events/new' })}
            />
          )}
        </Flex>
        {events.length > 0 && <EventsGrid events={events} />}
        {events.length === 0 && <Text fontSize="larger">Currently, there are no events 🙁</Text>}
      </>
    );
  },
});
