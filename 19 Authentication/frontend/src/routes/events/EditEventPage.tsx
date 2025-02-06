import { useNavigate, useParams, useRouteLoaderData } from 'react-router';

import { Box, Heading } from '@chakra-ui/react';

import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { EventType } from '../../lib/backend';
import { EditEventForm } from './EditEventForm';

export function EditEventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const events = useRouteLoaderData<EventType[]>('events')!;
  const event = events.filter((event) => event.id === eventId)[0];

  return (
    <>
      <Breadcrumbs />
      <Heading mb="10">Edit Event Details</Heading>
      <Box w="100%" h="100%" maxW="45rem">
        <EditEventForm event={event!} onCancel={() => navigate(`/events/${eventId}`)} />
      </Box>
    </>
  );
}
