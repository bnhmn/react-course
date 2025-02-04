import { useForm } from 'react-hook-form';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router';

import { Box, Button, Heading, Spinner, Stack } from '@chakra-ui/react';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { FormInput } from '../../components/FormInput';
import { EventType, NewEventType, updateEvent } from '../../lib/backend';

export function EditEventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = useRouteLoaderData<EventType>('event');

  return (
    <>
      <Breadcrumbs />
      <Heading mb="10">Event Details</Heading>
      <Box w="100%" h="100%" maxW="45rem">
        <EventForm
          event={event!}
          onSubmit={(event) => updateEvent(eventId!, event).then(() => navigate('..'))}
          onCancel={() => navigate('..')}
        />
      </Box>
    </>
  );
}

function EventForm({
  event,
  onSubmit,
  onCancel,
}: {
  event: EventType;
  onSubmit: (event: NewEventType) => void;
  onCancel: () => void;
}) {
  const form = useForm<EventType>({ defaultValues: event });
  const isPending = form.formState.isSubmitting;

  const handleSubmit = form.handleSubmit((data) =>
    onSubmit({
      title: data.title,
      description: data.description,
      date: data.date,
      image: data.image,
    }),
  );

  // TODO: Adapt to react-router form https://reactrouter.com/6.29.0/components/form
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
