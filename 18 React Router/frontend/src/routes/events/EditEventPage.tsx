import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';

import { Heading, Image, Spinner, Stack, Text } from '@chakra-ui/react';

import { useEventBackend } from '../../lib/backend';
import { formatDate } from '../../lib/localization';

export function EditEventPage() {
  const { eventId } = useParams();
  const { event, isLoading } = useEventBackend(eventId!);
  const form = useForm();
  return (
    <>
      <Heading mb="10">Edit Event Details</Heading>
      {isLoading && <Spinner />}
      {!isLoading && event && (
        <Stack direction="column" gap="3">
          <Heading size="md">{event.title}</Heading>
          <Text mb="3">{formatDate(event.date)}</Text>
          <Image src={event.image} alt={event.title} />
          <Text mt="3">{event.description}</Text>
        </Stack>
      )}
    </>
  );
}
