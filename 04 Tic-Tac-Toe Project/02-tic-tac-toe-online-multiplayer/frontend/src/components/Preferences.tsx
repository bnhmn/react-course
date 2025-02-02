import useLocalStorageState from 'use-local-storage-state';

import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Stack,
} from '@chakra-ui/react';

export function Preferences({ onJoinGame = () => null }: { onJoinGame: (name: string, gridSize: number) => void }) {
  const [name, setName] = useLocalStorageState('todo.name', { defaultValue: '' });
  const [size, setSize] = useLocalStorageState('todo.size', { defaultValue: 3 });

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  function handleSizeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSize(parseInt(event.target.value));
  }

  return (
    <Stack spacing={8} padding="1rem">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <InputGroup>
          <Input value={name} placeholder="Please enter your name" onChange={handleNameChange} />
          <InputRightAddon>
            <Avatar name={name} size="sm" />
          </InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Game Size</FormLabel>
        <Select defaultValue={size} onChange={handleSizeChange}>
          <option value="3">3x3</option>
          <option value="4">4x4</option>
        </Select>
      </FormControl>

      <Button onClick={() => onJoinGame(name, size)} disabled={name.trim() === ''}>
        Join Game
      </Button>
    </Stack>
  );
}
