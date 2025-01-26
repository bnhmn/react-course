import { useState } from 'react';
import { FieldValues, RegisterOptions, UseFormReturn } from 'react-hook-form';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

interface FormInputProps {
  name: string;
  type: React.HTMLInputTypeAttribute | 'discoverable-password';
  label: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  placeholder?: string;
  defaultValue?: string;
  form: UseFormReturn<FieldValues, unknown, undefined>;
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
  form,
  validations = {},
  errorMessage,
}: FormInputProps) {
  const [show, setShow] = useState(false);
  const isInvalid = form.formState.errors[name] !== undefined;

  if (type !== 'discoverable-password') {
    return (
      <FormControl isInvalid={isInvalid}>
        <FormLabel>{label}</FormLabel>
        <Input
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder ?? `Your ${label.toLowerCase()}`}
          defaultValue={defaultValue}
          {...form.register(name, validations)}
        />
        <FormErrorMessage>{errorMessage ?? `Please enter a valid ${label.toLowerCase()}.`}</FormErrorMessage>
      </FormControl>
    );
  } else {
    return (
      <FormControl isInvalid={isInvalid}>
        <FormLabel>{label}</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            autoComplete={autoComplete}
            placeholder={placeholder ?? `Your ${label.toLowerCase()}`}
            defaultValue={defaultValue}
            {...form.register(name, validations)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" variant="ghost" onClick={() => setShow((prev) => !prev)}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errorMessage ?? `Please enter a valid ${label.toLowerCase()}.`}</FormErrorMessage>
      </FormControl>
    );
  }
}
