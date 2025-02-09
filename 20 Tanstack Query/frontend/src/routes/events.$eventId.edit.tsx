import { Box, Heading } from '@chakra-ui/react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { EventForm } from '../components/events/EventForm';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { fetchEvent } from '../lib/backend';

// This is a dynamic route.
// Path segments that start with a $ are dynamic. Their values are captured into the params object.
// https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#dynamic-route-segments

export const Route = createFileRoute('/events/$eventId/edit')({
  loader: async ({ params }) => await fetchEvent(params.eventId),

  component: function Component() {
    const navigate = useNavigate();
    const event = Route.useLoaderData();

    return (
      <>
        <Breadcrumbs />
        <Heading mb="10">Edit Event Details</Heading>
        <Box w="100%" h="100%" maxW="45rem">
          <EventForm
            event={event!}
            onCancel={() => navigate({ from: '/events/$eventId/edit', to: '/events/$eventId' })}
          />
        </Box>
      </>
    );
  },
});
