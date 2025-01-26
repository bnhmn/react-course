import { ReactNode } from 'react';

import { Stack } from '@chakra-ui/react';

export function FormRow({ children }: { children: ReactNode }) {
  return (
    <Stack w="100%" direction={{ base: 'column', md: 'row' }} spacing="1rem">
      {children}
    </Stack>
  );
}
