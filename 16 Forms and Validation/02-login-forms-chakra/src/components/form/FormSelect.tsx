import { FieldValues, UseFormReturn } from 'react-hook-form';

import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';

interface FormSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  options: { [key: string]: string };
  form: UseFormReturn<FieldValues, unknown, undefined>;
  required?: boolean;
}

export function FormSelect({ name, label, placeholder, defaultValue, options, form, required }: FormSelectProps) {
  const isInvalid = form.formState.errors[name] !== undefined;

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <Select
        placeholder={placeholder ?? `Your ${label.toLowerCase()}`}
        defaultValue={defaultValue}
        {...form.register(name, { required })}
      >
        {Object.entries(options).map(([id, label]) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{`Please select a ${label.toLowerCase()}.`}</FormErrorMessage>
    </FormControl>
  );
}
