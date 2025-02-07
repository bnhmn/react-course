import { useNavigate, useRouteLoaderData } from 'react-router';

import { useAuth0 } from '@auth0/auth0-react';
import { AddIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Text } from '@chakra-ui/react';

import { EventType } from '../../lib/backend';
import { ViewEvents } from './ViewEvents';

export function ViewEventsPage() {
  const navigate = useNavigate();
  const events = useRouteLoaderData<EventType[]>('events')!;
  const { isAuthenticated } = useAuth0();

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
            onClick={() => navigate('new')}
          />
        )}
      </Flex>
      {events.length > 0 && <ViewEvents events={events} />}
      {events.length === 0 && <Text fontSize="larger">Currently, there are no events 🙁</Text>}
    </>
  );
}
