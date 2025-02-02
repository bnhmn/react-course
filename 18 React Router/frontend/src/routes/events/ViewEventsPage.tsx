import { Heading, Spinner } from '@chakra-ui/react';

import { Events } from '../../components/Events';
import { useEventsBackend } from '../../lib/backend';

export function ViewEventsPage() {
  const { events, isLoading } = useEventsBackend();
  return (
    <>
      <Heading mb="10">All Events</Heading>
      {isLoading && <Spinner />}
      {!isLoading && <Events events={events} />}
    </>
  );
}
