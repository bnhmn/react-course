import { Link, useNavigate, useParams } from 'react-router';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, Image, Spinner, Stack, Text } from '@chakra-ui/react';

import { EventType, useDeleteEventBackend, useEventBackend } from '../../lib/backend';
import { formatDate } from '../../lib/localization';

export function ViewEventPage() {
  const { eventId } = useParams();
  const { event, isLoading } = useEventBackend(eventId!);

  return (
    <>
      <Heading mb="10">Event Details</Heading>
      {isLoading && <Spinner />}
      {!isLoading && event && <Event event={event} />}
    </>
  );
}

function Event({ event }: { event: EventType }) {
  const { deleteEvent, isLoading } = useDeleteEventBackend(event.id);
  const navigate = useNavigate(); // https://reactrouter.com/start/library/navigating
  return (
    <Stack direction="column" gap="3">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Heading size="md">{event.title}</Heading>
        <Box>
          <IconButton
            as={Link}
            to="edit"
            icon={<EditIcon />}
            size="lg"
            variant="ghost"
            aria-label="Edit event"
            disabled={isLoading}
          />
          <IconButton
            icon={<DeleteIcon />}
            size="lg"
            variant="ghost"
            aria-label="Delete event"
            onClick={() => deleteEvent().then(() => navigate('..'))}
            disabled={isLoading}
          />
        </Box>
      </Stack>
      <Text mb="3">{formatDate(event.date)}</Text>
      <Image src={event.image} alt={event.title} />
      <Text mt="3">{event.description}</Text>
    </Stack>
  );
}
