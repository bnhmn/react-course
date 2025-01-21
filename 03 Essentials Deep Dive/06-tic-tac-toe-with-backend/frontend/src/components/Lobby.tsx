import { Avatar, Box, Heading, Progress, Spacer, VStack } from '@chakra-ui/react';

import { LobbyType } from '../backend/types/Lobby';

export function Lobby({ lobby }: { lobby: LobbyType }) {
  const title = lobby.state === 'ready' ? 'Game is starting...' : 'Waiting for opponent...';
  const players = lobby.players;
  return (
    <VStack align="stretch" spacing={4}>
      <Heading size="sm">{title}</Heading>

      {players.map((player, index) => (
        <LobbyPlayer key={index} name={player.name} isLast={index == players.length - 1} />
      ))}

      <Spacer />

      <Progress isIndeterminate marginBottom="1rem" />
    </VStack>
  );
}

function LobbyPlayer({ name, isLast }: { name: string; isLast: boolean }) {
  return (
    <>
      <Box w="100%" p={4}>
        <Avatar name={name} />
        <span className="player-name">{name}</span>
      </Box>
      {!isLast && (
        <Box>
          <span className="player-name">vs</span>
        </Box>
      )}
    </>
  );
}
