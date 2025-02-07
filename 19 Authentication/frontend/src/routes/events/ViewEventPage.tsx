import { useState } from 'react';
import { useFetcher, useNavigate, useParams, useRouteLoaderData } from 'react-router';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Heading } from '@chakra-ui/react';

import { DeleteDialog } from '../../components/DeleteDialog';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { EventType } from '../../lib/backend';
import { ViewEvent } from './ViewEvent';

export function ViewEventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const events = useRouteLoaderData<EventType[]>('events')!;
  const event = events.filter((event) => event.id === eventId)[0];
  const [deleteDialogOpen, setDeleteOpen] = useState(false);

  // https://reactrouter.com/en/6.29.0/start/tutorial#mutations-without-navigation
  const fetcher = useFetcher();

  // Optimistic update: https://reactrouter.com/en/6.29.0/start/tutorial#optimistic-ui
  const watching = fetcher.formData ? fetcher.formData.get('command') === 'watch' : event.watching;

  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Breadcrumbs />
      <Heading mb="10">Event Details</Heading>
      <Box w="100%" h="100%" maxW="45rem">
        <ViewEvent
          event={{ ...event, watching }}
          canModify={isAuthenticated}
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
