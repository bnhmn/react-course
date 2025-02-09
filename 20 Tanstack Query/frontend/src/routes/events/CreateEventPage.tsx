import { useNavigate } from 'react-router';

import { Box, Heading } from '@chakra-ui/react';

import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { EditEventForm } from './EditEventForm';

export function CreateEventPage() {
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumbs />
      <Heading mb="10">Create Event</Heading>
      <Box w="100%" h="100%" maxW="45rem">
        <EditEventForm
          event={{
            title: 'My Awesome Event',
            date: '2020-01-01',
            image: 'https://blog.hubspot.de/hubfs/Germany/Blog_images/Optimize_Marketing%20Events%20DACH%202021.jpg',
            description: 'Join this amazing event and connect with fellow developers.',
          }}
          onCancel={() => navigate('..')}
        />
      </Box>
    </>
  );
}
