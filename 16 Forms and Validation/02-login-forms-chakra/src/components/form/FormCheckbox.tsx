import { FieldValues, UseFormReturn } from 'react-hook-form';

import { Checkbox, CheckboxGroup, FormControl, FormErrorMessage, FormLabel, Stack } from '@chakra-ui/react';

type FormCheckboxProps =
  | {
      name: string;
      type?: 'single';
      label: string;
      description: string;
      required?: boolean;
      errorMessage?: string;
      form: UseFormReturn<FieldValues, unknown, undefined>;
    }
  | {
      name: string;
      type: 'multi';
      label: string;
      options: { [key: string]: string };
      required?: boolean;
      errorMessage?: string;
      form: UseFormReturn<FieldValues, unknown, undefined>;
    };

export function FormCheckbox(props: FormCheckboxProps) {
  const isInvalid = props.form.formState.errors[props.name] !== undefined;
  if (props.type !== 'multi') {
    const { name, label, description, required, errorMessage, form } = props;
    return (
      <FormControl isInvalid={isInvalid}>
        <FormLabel>{label}</FormLabel>
        <Checkbox {...form.register(name, { required })}>{description}</Checkbox>
        <FormErrorMessage>{errorMessage ?? `Please select a ${label.toLowerCase()}.`}</FormErrorMessage>
      </FormControl>
    );
  } else {
    const { name, label, options, required, errorMessage, form } = props;
    // https://v2.chakra-ui.com/docs/components/form-control
    return (
      <FormControl as="fieldset" isInvalid={isInvalid}>
        <FormLabel as="legend">{label}</FormLabel>
        <CheckboxGroup>
          <Stack spacing={{ base: '1', md: '5' }} direction={{ base: 'column', md: 'row' }}>
            {Object.entries(options).map(([id, label]) => (
              <Checkbox key={id} id={id} {...form.register(name, { required })}>
                {label}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
        <FormErrorMessage>{errorMessage ?? `Please select an option.`}</FormErrorMessage>
      </FormControl>
    );
  }
}
