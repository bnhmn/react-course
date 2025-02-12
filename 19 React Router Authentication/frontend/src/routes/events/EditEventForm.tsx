import { Form, useNavigation } from 'react-router';

import { Stack } from '@chakra-ui/react';

import { FormButton } from '../../components/form/FormButton';
import { FormInput } from '../../components/form/FormInput';
import { NewEventType } from '../../lib/backend';

export function EditEventForm({ event, onCancel }: { event?: NewEventType; onCancel: () => void }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    //  https://reactrouter.com/6.29.0/components/form
    <Form method="post">
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
          <FormButton type="submit" name="command" value="edit" variant="solid" isLoading={isSubmitting}>
            Submit
          </FormButton>
          <FormButton type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </FormButton>
        </Stack>
      </Stack>
    </Form>
  );
}
