import { RegisterOptions, UseFormReturn } from 'react-hook-form';

import { FormControl, FormErrorMessage, FormLabel, Input, InputProps, Textarea, TextareaProps } from '@chakra-ui/react';

type FormInputProps = {
  name: string;
  label: string;
  errorMessage?: string;
  validations: RegisterOptions;
  form: UseFormReturn<any, any, any>;
} & (
  | ({ type: 'date' | 'email' | 'image' | 'number' | 'password' | 'tel' | 'text' | 'url' } & Omit<InputProps, 'form'>)
  | ({ type: 'textarea' } & Omit<TextareaProps, 'form'>)
);

export function FormInput(props: FormInputProps) {
  const { name, type, label, placeholder, errorMessage, validations, form, ...rest } = props;
  const safePlaceholder = placeholder ?? `Your ${label.toLowerCase()}`;
  const safeErrorMessage = errorMessage ?? `Please enter a valid ${label.toLowerCase()}.`;
  const isRequired = !!validations.required;
  const isInvalid = form.formState.errors[name] !== undefined;
  const isSubmitting = form.formState.isSubmitting;

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      {type !== 'textarea' && (
        <Input
          type={type}
          placeholder={safePlaceholder}
          isDisabled={isSubmitting}
          {...(rest as InputProps)}
          {...form.register(name, validations)}
        />
      )}
      {props.type === 'textarea' && (
        <Textarea
          placeholder={safePlaceholder}
          isDisabled={isSubmitting}
          {...(rest as TextareaProps)}
          {...form.register(name, validations)}
        />
      )}
      <FormErrorMessage>{safeErrorMessage}</FormErrorMessage>
    </FormControl>
  );
}
