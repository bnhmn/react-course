import { useState } from 'react';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router';

import { Box, Heading } from '@chakra-ui/react';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { DeleteDialog } from '../../components/DeleteDialog';
import { deleteEvent, EventType } from '../../lib/backend';
import { ViewEvent } from './ViewEvent';

export function ViewEventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = useRouteLoaderData<EventType>('event');
  const [deleteDialogOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <Breadcrumbs />
      <Heading mb="10">Event Details</Heading>
      <Box w="100%" h="100%" maxW="45rem">
        <ViewEvent event={event!} onEdit={() => navigate('edit')} onDelete={() => setDeleteOpen(true)} />
      </Box>
      <DeleteDialog
        label={`Delete "${event?.title}"`}
        open={deleteDialogOpen}
        onSubmit={() => deleteEvent(eventId!).then(() => navigate('..'))}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}
