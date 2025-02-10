import { Button, ButtonProps } from '@chakra-ui/react';
import { useRouterState } from '@tanstack/react-router';

export function FormButton(props: ButtonProps) {
  const { isLoading } = useRouterState();
  return <Button {...props} disabled={isLoading} />;
}
