import { useState } from 'react';

import { Box, Heading } from '@chakra-ui/react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { EventView } from '../components/events/EventView';
import { DeleteDialog } from '../components/form/DeleteDialog';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { deleteEvent, ensureEventsData, useEventData, useWatchEventMutation } from '../lib/backend';

export const Route = createFileRoute('/events/$eventId/')({
  loader: ensureEventsData,
  component: Component,
});

function Component() {
  // https://tanstack.com/router/latest/docs/framework/react/guide/navigation
  const navigate = useNavigate();
  const { eventId } = Route.useParams();
  const { event } = useEventData(eventId);
  const { mutate, variables } = useWatchEventMutation(eventId);
  const [deleteDialogOpen, setDeleteOpen] = useState(false);

  // Optimistic update: https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates
  const watching = variables ? variables === 'watch' : event.watching;

  return (
    <>
      <Breadcrumbs />
      <Heading mb="10">Event Details</Heading>
      <Box w="100%" h="100%" maxW="45rem">
        <EventView
          event={{ ...event, watching }}
          onWatch={() => mutate('watch')}
          onUnwatch={() => mutate('unwatch')}
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
