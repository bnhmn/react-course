import { Box, Heading } from '@chakra-ui/react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { EventForm } from '../components/events/EventForm';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';

export const Route = createFileRoute('/events/new')({
  component: function Component() {
    const navigate = useNavigate();

    return (
      <>
        <Breadcrumbs />
        <Heading mb="10">Create Event</Heading>
        <Box w="100%" h="100%" maxW="45rem">
          <EventForm
            event={{
              title: 'My Awesome Event',
              date: '2020-01-01',
              image: 'https://blog.hubspot.de/hubfs/Germany/Blog_images/Optimize_Marketing%20Events%20DACH%202021.jpg',
              description: 'Join this amazing event and connect with fellow developers.',
            }}
            onCancel={() => navigate({ to: '/events' })}
          />
        </Box>
      </>
    );
  },
});
