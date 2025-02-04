import { RegisterOptions, UseFormReturn } from 'react-hook-form';
import { useNavigation } from 'react-router';

import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';

interface FormInputProps {
  name: string;
  type: React.HTMLInputTypeAttribute | 'textarea';
  label: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  placeholder?: string;
  defaultValue?: string;
  rows?: number;
  form?: UseFormReturn<any, unknown, undefined>;
  validations?: RegisterOptions;
  required?: boolean;
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
  required,
  errorMessage,
}: FormInputProps) {
  const InputType = type === 'textarea' ? Textarea : Input;
  const isRequired = required || !!validations.required;
  const isInvalid = false; // form.formState.errors[name] !== undefined;
  const navigation = useNavigation();
  const isPending = navigation.state !== 'idle';
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <InputType
        type={type}
        id={name}
        name={name}
        rows={rows}
        autoComplete={autoComplete}
        placeholder={placeholder ?? `Your ${label.toLowerCase()}`}
        defaultValue={defaultValue}
        required={required}
        disabled={isPending}
        //{...form.register(name, validations)}
      />
      <FormErrorMessage>{errorMessage ?? `Please enter a valid ${label.toLowerCase()}.`}</FormErrorMessage>
    </FormControl>
  );
}
