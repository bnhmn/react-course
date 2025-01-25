import { FieldValues, RegisterOptions, UseFormReturn } from 'react-hook-form';

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

export function FormInput({
  name,
  type,
  label,
  autoComplete,
  defaultValue,
  form,
  validations = {},
  errorMessage,
}: {
  name: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  defaultValue?: string;
  form: UseFormReturn<FieldValues, unknown, undefined>;
  validations: RegisterOptions;
  errorMessage?: string;
}) {
  const isInvalid = form.formState.errors[name] !== undefined;
  errorMessage = errorMessage ?? `Please enter a valid ${label.toLowerCase()}.`;
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        {...form.register(name, validations)}
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
