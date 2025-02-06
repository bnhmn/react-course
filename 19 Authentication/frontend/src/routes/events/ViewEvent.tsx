import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, Image, Stack, Text } from '@chakra-ui/react';

import { WatchIcon } from '../../components/WatchIcon';
import { EventType } from '../../lib/backend';
import { formatDate } from '../../lib/localization';

export function ViewEvent({
  event,
  onWatch,
  onEdit,
  onDelete,
}: {
  event: EventType;
  onWatch: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Stack direction="column" gap="3">
      <Stack
        direction={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'unset', md: 'center' }}
        justifyContent="space-between"
      >
        <Heading size="md">{event.title}</Heading>
        <Box>
          <IconButton
            icon={<WatchIcon active={event.watching} />}
            size="lg"
            variant="ghost"
            aria-label="Watch event"
            onClick={onWatch}
          />
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
