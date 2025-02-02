import { Link, useParams } from 'react-router';

import { EditIcon } from '@chakra-ui/icons';
import { Heading, IconButton, Image, Spinner, Stack, Text } from '@chakra-ui/react';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useEventBackend } from '../../lib/backend';
import { formatDate } from '../../lib/localization';

export function ViewEventPage() {
  const { eventId } = useParams();
  const { event, isLoading } = useEventBackend(eventId!);
  return (
    <>
      <Breadcrumbs />
      <Heading mb="10">Event Details</Heading>
      {isLoading && <Spinner />}
      {!isLoading && event && (
        <Stack direction="column" gap="3">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Heading size="md">{event.title}</Heading>
            <IconButton as={Link} to="edit" size="lg" icon={<EditIcon />} variant="ghost" aria-label="Edit event" />
          </Stack>
          <Text mb="3">{formatDate(event.date)}</Text>
          <Image src={event.image} alt={event.title} />
          <Text mt="3">{event.description}</Text>
        </Stack>
      )}
    </>
  );
}
