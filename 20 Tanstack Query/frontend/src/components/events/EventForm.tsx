import { Stack } from '@chakra-ui/react';
import { useRouterState } from '@tanstack/react-router';

import { NewEventType } from '../../lib/backend';
import { FormButton } from '../form/FormButton';
import { FormInput } from '../form/FormInput';

export function EventForm({ event, onCancel }: { event?: NewEventType; onCancel: () => void }) {
  const { isLoading } = useRouterState();

  return (
    // TODO: https://reactrouter.com/6.29.0/components/form
    <form method="post">
      <Stack direction="column" w="100%" align="start" spacing="1.3rem">
        <FormInput name="title" type="text" label="Title" defaultValue={event?.title} isRequired />
        <FormInput
          name="description"
          type="textarea"
          label="Description"
          defaultValue={event?.description}
          rows={6}
          isRequired
        />
        <FormInput name="date" type="date" label="Date" defaultValue={event?.date} isRequired />
        <FormInput
          name="image"
          type="url"
          label="Image URL"
          defaultValue={event?.image}
          pattern="https?://.*"
          isRequired
        />
        <Stack direction="row" gap="0.3rem" mt="1rem">
          <FormButton type="submit" name="command" value="edit" variant="solid" isLoading={isLoading}>
            Submit
          </FormButton>
          <FormButton type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </FormButton>
        </Stack>
      </Stack>
    </form>
  );
}
