import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useFetcher, useNavigate, useParams, useRouteLoaderData } from 'react-router';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, Image, Stack, Text } from '@chakra-ui/react';

import { DeleteDialog } from '../../components/DeleteDialog';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs';
import { useAuthContext } from '../../lib/auth';
import { EventType } from '../../lib/backend';
import { formatDate } from '../../lib/localization';

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

  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <Breadcrumbs />
      <Heading mb="10">Event Details</Heading>
      <Box w="100%" h="100%" maxW="45rem">
        <Stack direction="column" gap="3">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'unset', md: 'center' }}
            justifyContent="space-between"
          >
            <Heading size="md">{event.title}</Heading>
            {isAuthenticated && (
              <Box>
                <IconButton
                  icon={watching ? <FaStar /> : <FaRegStar />}
                  size="lg"
                  variant="ghost"
                  aria-label="Watch event"
                  onClick={() => fetcher.submit({ command: event.watching ? 'unwatch' : 'watch' }, { method: 'POST' })}
                />
                <IconButton
                  icon={<EditIcon />}
                  size="lg"
                  variant="ghost"
                  aria-label="Edit event"
                  onClick={() => navigate('edit')}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  size="lg"
                  variant="ghost"
                  aria-label="Delete event"
                  onClick={() => setDeleteOpen(true)}
                />
              </Box>
            )}
          </Stack>
          <Text mb="3">{formatDate(event.date)}</Text>
          <Image src={event.image} alt={event.title} />
          <Text mt="3" whiteSpace="pre-line">
            {event.description}
          </Text>
        </Stack>
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
