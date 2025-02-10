import { FormControl, FormErrorMessage, FormLabel, Input, InputProps, Textarea, TextareaProps } from '@chakra-ui/react';
import { useRouterState } from '@tanstack/react-router';

type FormInputProps =
  | ({
      name: string;
      type: 'date' | 'email' | 'file' | 'image' | 'number' | 'password' | 'range' | 'tel' | 'text' | 'time' | 'url';
      label: string;
      errorMessage?: string;
    } & InputProps)
  | ({ name: string; type: 'textarea'; label: string; errorMessage?: string } & TextareaProps);

export function FormInput(props: FormInputProps) {
  const { isLoading } = useRouterState();
  const placeholder = props.placeholder ?? `Your ${props.label.toLowerCase()}`;
  const errorMessage = props.errorMessage ?? `Please enter a valid ${props.label.toLowerCase()}.`;
  return (
    <FormControl isRequired={props.isRequired} isInvalid={false}>
      <FormLabel>{props.label}</FormLabel>
      {props.type !== 'textarea' && <Input {...props} placeholder={placeholder} isDisabled={isLoading} />}
      {props.type === 'textarea' && <Textarea {...props} placeholder={placeholder} isDisabled={isLoading} />}
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
