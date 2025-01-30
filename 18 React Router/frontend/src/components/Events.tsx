import { Link as RouterLink } from 'react-router';

import { Card, CardBody, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { EventType } from '../lib/backend';
import { formatDate } from '../lib/localization';

export function Events({ events }: { events: EventType[] }) {
  // https://v2.chakra-ui.com/docs/components/simple-grid
  // https://v2.chakra-ui.com/docs/components/card
  return (
    <SimpleGrid w="100%" h="100%" maxW="70rem" columns={{ base: 1, md: 2, lg: 3 }} spacing="40px" justifyItems="center">
      {events.map((event) => (
        <Card key={event.id} width="100%" _hover={{ bg: 'whitesmoke' }}>
          {/* This is a link to another page: https://reactrouter.com/start/library/navigating#link */}
          <CardBody as={RouterLink} to={event.id}>
            <Stack direction="column" gap="3">
              <Heading size="md">{event.title}</Heading>
              <Text mb="3">{formatDate(event.date)}</Text>
              <Image src={event.image} alt={event.title} borderRadius="md" />
              <Text mt="3">{event.description}</Text>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
}
