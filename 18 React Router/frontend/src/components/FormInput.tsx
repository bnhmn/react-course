import { RegisterOptions, UseFormReturn } from 'react-hook-form';

import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';

interface FormInputProps {
  name: string;
  type: React.HTMLInputTypeAttribute | 'textarea';
  label: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  placeholder?: string;
  defaultValue?: string;
  rows?: number;
  form: UseFormReturn<any, unknown, undefined>;
  validations: RegisterOptions;
  errorMessage?: string;
}

export function FormInput({
  name,
  type,
  label,
  autoComplete,
  placeholder,
  defaultValue,
  rows,
  form,
  validations = {},
  errorMessage,
}: FormInputProps) {
  const InputType = type === 'textarea' ? Textarea : Input;
  const isRequired = !!validations.required;
  const isInvalid = form.formState.errors[name] !== undefined;
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <InputType
        type={type}
        rows={rows}
        autoComplete={autoComplete}
        placeholder={placeholder ?? `Your ${label.toLowerCase()}`}
        defaultValue={defaultValue}
        {...form.register(name, validations)}
      />
      <FormErrorMessage>{errorMessage ?? `Please enter a valid ${label.toLowerCase()}.`}</FormErrorMessage>
    </FormControl>
  );
}
