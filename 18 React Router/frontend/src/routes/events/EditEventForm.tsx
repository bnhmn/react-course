import { Form, useNavigation } from 'react-router';

import { Button, Spinner, Stack } from '@chakra-ui/react';

import { FormInput } from '../../components/FormInput';
import { EventType } from '../../lib/backend';

export function EditEventForm({ event, onCancel }: { event: EventType; onCancel: () => void }) {
  const { title, description, date, image } = event;
  const navigation = useNavigation();
  const isPending = navigation.state !== 'idle';

  return (
    //  https://reactrouter.com/6.29.0/components/form
    <Form method="post">
      <Stack direction="column" w="100%" align="start" spacing="1.3rem">
        <FormInput name="title" type="text" label="Title" defaultValue={title} required />
        <FormInput
          name="description"
          type="textarea"
          label="Description"
          defaultValue={description}
          rows={6}
          required
        />
        <FormInput name="date" type="date" label="Date" defaultValue={date} required />
        <FormInput name="image" type="url" label="Image URL" defaultValue={image} required />
        <Stack direction="row" gap="0.3rem" mt="1rem">
          <Button type="submit" variant="solid" isDisabled={isPending}>
            {isPending ? <Spinner /> : 'Submit'}
          </Button>
          <Button type="button" variant="ghost" onClick={onCancel} isDisabled={isPending}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
