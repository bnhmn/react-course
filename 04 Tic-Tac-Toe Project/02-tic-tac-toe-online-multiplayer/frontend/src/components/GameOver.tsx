import { Heading, Text, VStack } from '@chakra-ui/react';

import { PlayerType } from '../backend/types/Player';

interface GameOverProps {
  winner: PlayerType | null;
  finished: boolean;
  cancelled: boolean;
  onRematch: () => void;
}

export function GameOver({ winner, finished, cancelled, onRematch }: GameOverProps) {
  return (
    <VStack id="game-over" spacing="3rem">
      <Heading>Game Over!</Heading>
      {finished && winner && <Text>{winner.name} won!</Text>}
      {finished && !winner && <Text>It's a draw!</Text>}
      {cancelled && <Text>The game was cancelled 🙁</Text>}
      <button onClick={onRematch}>Rematch</button>
    </VStack>
  );
}
