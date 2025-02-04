import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, Image, Stack, Text } from '@chakra-ui/react';

import { EventType } from '../../lib/backend';
import { formatDate } from '../../lib/localization';

export function ViewEvent({ event, onEdit, onDelete }: { event: EventType; onEdit: () => void; onDelete: () => void }) {
  return (
    <Stack direction="column" gap="3">
      <Stack
        direction={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'unset', md: 'center' }}
        justifyContent="space-between"
      >
        <Heading size="md">{event.title}</Heading>
        <Box>
          <IconButton icon={<EditIcon />} size="lg" variant="ghost" aria-label="Edit event" onClick={onEdit} />
          <IconButton icon={<DeleteIcon />} size="lg" variant="ghost" aria-label="Delete event" onClick={onDelete} />
        </Box>
      </Stack>
      <Text mb="3">{formatDate(event.date)}</Text>
      <Image src={event.image} alt={event.title} />
      <Text mt="3" whiteSpace="pre-line">
        {event.description}
      </Text>
    </Stack>
  );
}
