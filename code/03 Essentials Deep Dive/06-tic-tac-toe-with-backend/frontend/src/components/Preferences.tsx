import { useState } from 'react';
import { useCookies } from 'react-cookie';

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
  const [cookies, setCookie] = useCookies(['preferences']);
  const preferences = { name: cookies.preferences?.name ?? '', size: cookies.preferences?.size ?? 3 };
  const [name, setName] = useState(preferences.name);
  const [size, setSize] = useState(preferences.size);

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
    setCookie('preferences', { ...preferences, name: event.target.value });
  }
  function handleSizeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSize(parseInt(event.target.value));
    setCookie('preferences', { ...preferences, size: parseInt(event.target.value) });
  }

  return (
    <Stack spacing={8} padding="2em">
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

      <Button onClick={() => onJoinGame(name, size)}>Join Game</Button>
    </Stack>
  );
}
