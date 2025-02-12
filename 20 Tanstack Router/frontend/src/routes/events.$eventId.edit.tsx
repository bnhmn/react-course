import { Box, Heading } from '@chakra-ui/react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { EventForm } from '../components/events/EventForm';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { ensureEventsData, updateEvent, useEventData } from '../lib/backend';

// This is a dynamic route.
// Path segments that start with a $ are dynamic. Their values are captured into the params object.
// https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#dynamic-route-segments

export const Route = createFileRoute('/events/$eventId/edit')({
  loader: ensureEventsData,
  component: Component,
});

function Component() {
  const navigate = useNavigate();
  const { eventId } = Route.useParams();
  const { event } = useEventData(eventId);

  return (
    <>
      <Breadcrumbs />
      <Heading mb="10">Edit Event Details</Heading>
      <Box w="100%" h="100%" maxW="45rem">
        <EventForm
          defaultValues={event!}
          onSubmit={(newData) => updateEvent(event.id, newData).then(() => navigate({ to: `/events/${event.id}` }))}
          onCancel={() => navigate({ from: Route.fullPath, to: '/events/$eventId' })}
        />
      </Box>
    </>
  );
}
