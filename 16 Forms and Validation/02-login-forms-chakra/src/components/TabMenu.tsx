import { ReactNode } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import { Box, Button, Flex } from '@chakra-ui/react';

interface TabMenuProps {
  buttons: string[];
  content: (selectedButton: string) => ReactNode;
  defaultSelected?: string;
}

export function TabMenu({ buttons, content, defaultSelected }: TabMenuProps) {
  const [selected, setSelected] = useLocalStorageState('selected-button', {
    defaultValue: defaultSelected ?? buttons[0],
  });

  return (
    <>
      <Flex className="menu" mb={{ base: '2rem', md: '3rem' }} gap="0.2rem">
        {buttons.map((name) => (
          <Button key={name} variant="ghost" onClick={() => setSelected(name)} isActive={selected === name}>
            {name}
          </Button>
        ))}
      </Flex>
      <Box className="content">{content(selected)}</Box>
    </>
  );
}
