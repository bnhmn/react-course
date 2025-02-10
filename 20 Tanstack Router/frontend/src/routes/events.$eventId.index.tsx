import { useState } from 'react';

import { Box, Heading } from '@chakra-ui/react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { EventView } from '../components/events/EventView';
import { DeleteDialog } from '../components/form/DeleteDialog';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { fetchEvent } from '../lib/backend';

export const Route = createFileRoute('/events/$eventId/')({
  loader: async ({ params }) => await fetchEvent(params.eventId),

  component: function Component() {
    // https://tanstack.com/router/latest/docs/framework/react/guide/navigation
    const navigate = useNavigate();
    const event = Route.useLoaderData();
    const [deleteDialogOpen, setDeleteOpen] = useState(false);

    // https://reactrouter.com/en/6.29.0/start/tutorial#mutations-without-navigation
    // TODO: const fetcher = useFetcher();
    const fetcher = {} as any; // TODO:

    // Optimistic update: https://reactrouter.com/en/6.29.0/start/tutorial#optimistic-ui
    // TODO: const watching = fetcher.formData ? fetcher.formData.get('command') === 'watch' : event.watching;

    return (
      <>
        <Breadcrumbs />
        <Heading mb="10">Event Details</Heading>
        <Box w="100%" h="100%" maxW="45rem">
          <EventView
            event={event}
            onWatch={() => fetcher.submit({ command: 'watch' }, { method: 'POST' })}
            onUnwatch={() => fetcher.submit({ command: 'unwatch' }, { method: 'POST' })}
            onEdit={() => navigate({ from: Route.fullPath, to: 'edit' })}
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
  },
});
