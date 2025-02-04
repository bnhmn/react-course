import { useState } from 'react';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, Image, Stack, Text } from '@chakra-ui/react';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { DeleteDialog } from '../../components/DeleteDialog';
import { deleteEvent, EventType } from '../../lib/backend';
import { formatDate } from '../../lib/localization';

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
        <Event event={event!} onEdit={() => navigate('edit')} onDelete={() => setDeleteOpen(true)} />
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

function Event({ event, onEdit, onDelete }: { event: EventType; onEdit: () => void; onDelete: () => void }) {
  return (
    <Stack direction="column" gap="3">
      <Stack
        direction={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'unset', md: 'center' }}
        justifyContent="space-between"
      >
        <Heading size="md">{event.title}</Heading>
        <Box>
          <IconButton icon={<EditIcon />} size="lg" variant="ghost" aria-label="Edit event" onClick={onEdit} />
          <IconButton icon={<DeleteIcon />} size="lg" variant="ghost" aria-label="Delete event" onClick={onDelete} />
        </Box>
      </Stack>
      <Text mb="3">{formatDate(event.date)}</Text>
      <Image src={event.image} alt={event.title} />
      <Text mt="3" whiteSpace="pre-line">
        {event.description}
      </Text>
    </Stack>
  );
}
