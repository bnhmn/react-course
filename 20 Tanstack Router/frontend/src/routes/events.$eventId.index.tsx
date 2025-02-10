import { useState } from 'react';

import { Box, Heading } from '@chakra-ui/react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { EventView } from '../components/events/EventView';
import { DeleteDialog } from '../components/form/DeleteDialog';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import {
  addEventToWatchlist,
  deleteEvent,
  ensureEventData,
  removeEventFromWatchlist,
  useEventData,
} from '../lib/backend';

export const Route = createFileRoute('/events/$eventId/')({
  loader: ({ params }) => ensureEventData(params.eventId),
  component: Component,
});

function Component() {
  // https://tanstack.com/router/latest/docs/framework/react/guide/navigation
  const navigate = useNavigate();
  const { eventId } = Route.useParams();
  const { event } = useEventData(eventId);
  const [deleteDialogOpen, setDeleteOpen] = useState(false);

  // TODO: Optimistic update: https://reactrouter.com/en/6.29.0/start/tutorial#optimistic-ui
  // TODO: const watching = fetcher.formData ? fetcher.formData.get('command') === 'watch' : event.watching;

  return (
    <>
      <Breadcrumbs />
      <Heading mb="10">Event Details</Heading>
      <Box w="100%" h="100%" maxW="45rem">
        <EventView
          event={event}
          onWatch={() => addEventToWatchlist(event.id)}
          onUnwatch={() => removeEventFromWatchlist(event.id)}
          onEdit={() => navigate({ from: Route.fullPath, to: 'edit' })}
          onDelete={() => setDeleteOpen(true)}
        />
      </Box>
      <DeleteDialog
        label={`Delete "${event?.title}"`}
        open={deleteDialogOpen}
        onSubmit={() => deleteEvent(event.id).then(() => navigate({ to: '/events' }))}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}
