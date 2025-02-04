import { useNavigate, useRouteLoaderData } from 'react-router';

import { Box, Heading } from '@chakra-ui/react';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { EventType } from '../../lib/backend';
import { EditEventForm } from './EditEventForm';

export function EditEventPage() {
  const navigate = useNavigate();
  const event = useRouteLoaderData<EventType>('event');

  return (
    <>
      <Breadcrumbs />
      <Heading mb="10">Edit Event Details</Heading>
      <Box w="100%" h="100%" maxW="45rem">
        <EditEventForm event={event!} onCancel={() => navigate('..')} />
      </Box>
    </>
  );
}
