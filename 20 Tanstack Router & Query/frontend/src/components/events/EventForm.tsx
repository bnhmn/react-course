import { useForm } from 'react-hook-form';

import { Stack } from '@chakra-ui/react';

import { NewEventType } from '../../lib/backend';
import { FormButton } from '../form/FormButton';
import { FormInput } from '../form/FormInput';

export function EventForm({
  defaultValues,
  onSubmit,
  onCancel,
}: {
  defaultValues?: NewEventType;
  onSubmit: (event: NewEventType) => Promise<any>;
  onCancel: () => void;
}) {
  // https://react-hook-form.com/get-started
  const form = useForm<NewEventType>({ defaultValues });
  const handleSubmit = form.handleSubmit(onSubmit);

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
          validations={{ required: true, pattern: /https?:\/\/.*/ }}
          form={form}
        />
        <Stack direction="row" gap="0.3rem" mt="1rem">
          <FormButton type="submit" variant="solid" form={form} isLoading={form.formState.isSubmitting}>
            Submit
          </FormButton>
          <FormButton type="button" variant="ghost" form={form} onClick={onCancel}>
            Cancel
          </FormButton>
        </Stack>
      </Stack>
    </form>
  );
}
