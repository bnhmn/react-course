import { AddIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { EventsGrid } from '../components/events/EventsGrid';
import { useAuth } from '../lib/auth-context';
import { ensureEventsData, useEventsData } from '../lib/backend';

export const Route = createFileRoute('/events/')({
  loader: ensureEventsData,
  component: Component,
});

function Component() {
  const navigate = useNavigate();
  const { events } = useEventsData();
  const { isAuthenticated } = useAuth();

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
}
