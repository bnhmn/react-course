import { Avatar, Box, HStack } from '@chakra-ui/react';

import { PlayerType } from '../backend/types/Player';

interface PlayersProps {
  players: PlayerType[];
  activePlayerNumber: number;
  ownPlayerNumber: number;
}

export function Players({ players, activePlayerNumber, ownPlayerNumber }: PlayersProps) {
  players = players.toSorted((p1, _) => (p1.number === ownPlayerNumber ? -1 : 0));
  return (
    <Box id="players" display={{ base: 'block', md: 'flex' }} gap="1rem" justifyContent="space-between">
      {players.map(({ number, symbol, name }) => (
        <HStack key={symbol} className={playerClass(number, activePlayerNumber, ownPlayerNumber)} gap="0.5rem">
          <Avatar name={name} size="sm" />
          <span className="player-name">{name}</span>
          <span className="player-symbol">{symbol}</span>
        </HStack>
      ))}
    </Box>
  );
}

function playerClass(playerNumber: number, activePlayerNumber: number, ownPlayerNumber: number) {
  return (
    'player ' +
    (playerNumber === activePlayerNumber ? 'active ' : '') +
    (playerNumber === ownPlayerNumber ? 'own' : 'other').trim()
  );
}
