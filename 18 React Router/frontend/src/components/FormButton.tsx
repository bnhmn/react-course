import { useNavigation } from 'react-router';

import { Button, ButtonProps } from '@chakra-ui/react';

export function FormButton(props: ButtonProps) {
  const navigation = useNavigation();
  return <Button {...props} disabled={navigation.state !== 'idle'} />;
}
