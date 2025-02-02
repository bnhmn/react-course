import { useParams } from 'react-router';

import { Heading, Spinner } from '@chakra-ui/react';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Event } from '../../components/Event';
import { useEventBackend } from '../../lib/backend';

export function ViewEventPage() {
  const { eventId } = useParams();
  const { event, isLoading } = useEventBackend(eventId!);
  return (
    <>
      <Breadcrumbs />
      <Heading mb="10">Event Details</Heading>
      {isLoading && <Spinner />}
      {!isLoading && event && <Event event={event} />}
    </>
  );
}
