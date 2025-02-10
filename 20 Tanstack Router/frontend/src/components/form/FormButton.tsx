import { UseFormReturn } from 'react-hook-form';

import { Button, ButtonProps } from '@chakra-ui/react';

type FormButtonProps = {
  form: UseFormReturn<any, any, any>;
} & Omit<ButtonProps, 'form'>;

export function FormButton(props: FormButtonProps) {
  const { form, ...rest } = props;
  return <Button {...rest} disabled={form.formState.isSubmitting} />;
}
