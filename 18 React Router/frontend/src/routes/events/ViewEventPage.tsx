import { useState } from 'react';
import { useFetcher, useNavigate, useParams, useRouteLoaderData } from 'react-router';

import { Box, Heading } from '@chakra-ui/react';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { DeleteDialog } from '../../components/DeleteDialog';
import { EventType } from '../../lib/backend';
import { ViewEvent } from './ViewEvent';

export function ViewEventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const events = useRouteLoaderData<EventType[]>('events')!;
  const event = events.filter((event) => event.id === eventId)[0];
  const [deleteDialogOpen, setDeleteOpen] = useState(false);

  // Optimistic update: https://reactrouter.com/en/6.29.0/start/tutorial#optimistic-ui
  const watching = fetcher.formData ? fetcher.formData.get('command') === 'watch' : event.watching;

  return (
    <>
      <Breadcrumbs />
      <Heading mb="10">Event Details</Heading>
      <Box w="100%" h="100%" maxW="45rem">
        <ViewEvent
          event={{ ...event, watching }}
          onWatch={() => fetcher.submit({ command: event.watching ? 'unwatch' : 'watch' }, { method: 'POST' })}
          onEdit={() => navigate('edit')}
          onDelete={() => setDeleteOpen(true)}
        />
      </Box>
      <DeleteDialog
        label={`Delete "${event?.title}"`}
        open={deleteDialogOpen}
        onSubmit={() => fetcher.submit({ command: 'delete' }, { method: 'POST' })}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}
