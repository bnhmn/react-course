import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, IconButton, Image, Spinner, Stack, Text } from '@chakra-ui/react';

import { FormInput } from '../../components/FormInput';
import { EventType, EventUpdateType, useEventBackend } from '../../lib/backend';
import { formatDate } from '../../lib/localization';

export function ViewEventPage() {
  const { eventId } = useParams();
  const { event, isLoading, isUpdatePending, ...backend } = useEventBackend(eventId!);
  const [isEditMode, setIsEditMode] = useState(false);
  // https://reactrouter.com/start/library/navigating
  const navigate = useNavigate();

  function handleStartEdit() {
    setIsEditMode(true);
  }
  async function handleSubmitEdit(event: EventUpdateType) {
    await backend.updateEvent(event);
    setIsEditMode(false);
  }
  function handleCancelEdit() {
    setIsEditMode(false);
  }
  async function handleDelete() {
    await backend.deleteEvent();
    navigate('..');
  }

  return (
    <>
      <Heading mb="10">Event Details</Heading>
      {isLoading && <Spinner />}
      <Box w="100%" h="100%" maxW="45rem">
        {event && !isEditMode && (
          <ViewEvent event={event} onEdit={handleStartEdit} onDelete={handleDelete} isPending={isUpdatePending} />
        )}
        {event && isEditMode && (
          <EditEvent
            event={event}
            onSubmit={handleSubmitEdit}
            onCancel={handleCancelEdit}
            isPending={isUpdatePending}
          />
        )}
      </Box>
    </>
  );
}

function ViewEvent({
  event,
  onEdit,
  onDelete,
  isPending,
}: {
  event: EventType;
  onEdit: () => void;
  onDelete: () => void;
  isPending: boolean;
}) {
  return (
    <Stack direction="column" gap="3">
      <Stack
        direction={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'unset', md: 'center' }}
        justifyContent="space-between"
      >
        <Heading size="md">{event.title}</Heading>
        <Box>
          <IconButton
            icon={<EditIcon />}
            size="lg"
            variant="ghost"
            aria-label="Edit event"
            onClick={onEdit}
            disabled={isPending}
          />
          <IconButton
            icon={<DeleteIcon />}
            size="lg"
            variant="ghost"
            aria-label="Delete event"
            onClick={onDelete}
            disabled={isPending}
          />
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

function EditEvent({
  event,
  onSubmit,
  onCancel,
  isPending,
}: {
  event: EventType;
  onSubmit: (event: EventUpdateType) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const form = useForm<EventType>({ defaultValues: event });

  const handleSubmit = form.handleSubmit((data) =>
    onSubmit({
      title: data.title,
      description: data.description,
      date: data.date,
      image: data.image,
    }),
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack direction="column" w="100%" align="start" spacing="1.3rem">
        <FormInput name="title" type="text" label="Title" validations={{ required: true }} form={form} />
        <FormInput
          name="description"
          type="textarea"
          label="Description"
          rows={6}
          validations={{ required: true }}
          form={form}
        />
        <FormInput name="date" type="date" label="Date" validations={{ required: true }} form={form} />
        <FormInput
          name="image"
          type="url"
          label="Image URL"
          validations={{ required: true, pattern: /https?:\/\/\w+/ }}
          form={form}
        />
        <Stack direction="row" gap="0.3rem" mt="1rem">
          <Button type="submit" variant="solid" isDisabled={isPending}>
            {isPending ? <Spinner /> : 'Submit'}
          </Button>
          <Button type="button" variant="ghost" onClick={onCancel} isDisabled={isPending}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
