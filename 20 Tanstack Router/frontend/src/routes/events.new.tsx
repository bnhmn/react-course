import { Box, Heading } from '@chakra-ui/react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { EventForm } from '../components/events/EventForm';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { createEvent } from '../lib/backend';

export const Route = createFileRoute('/events/new')({
  component: Component,
});

function Component() {
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumbs />
      <Heading mb="10">Create Event</Heading>
      <Box w="100%" h="100%" maxW="45rem">
        <EventForm
          defaultValues={{
            title: 'My Awesome Event',
            date: '2020-01-01',
            image: 'https://blog.hubspot.de/hubfs/Germany/Blog_images/Optimize_Marketing%20Events%20DACH%202021.jpg',
            description: 'Join this amazing event and connect with fellow developers.',
          }}
          onSubmit={(event) => createEvent(event).then(() => navigate({ to: '/events' }))}
          onCancel={() => navigate({ to: '/events' })}
        />
      </Box>
    </>
  );
}
