import { Heading, Image, Stack, Text } from '@chakra-ui/react';

import { EventType } from '../lib/backend';
import { formatDate } from '../lib/localization';

interface EventProps {
  event: EventType;
}

export function Event({ event }: EventProps) {
  return (
    <Stack direction="column" gap="3">
      <Heading size="md">{event.title}</Heading>
      <Text mb="3">{formatDate(event.date)}</Text>
      <Image src={event.image} alt={event.title} />
      <Text mt="3">{event.description}</Text>
    </Stack>
  );
}
