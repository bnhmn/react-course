import { Link, useLoaderData } from 'react-router';

import { Card, CardBody, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { EventType } from '../../lib/backend';
import { formatDate } from '../../lib/localization';
import { color } from '../../theme';

export function ViewEventsPage() {
  const events = useLoaderData<EventType[]>();
  return (
    <>
      <Heading mb="10">All Events</Heading>
      {events.length && <Events events={events} />}
      {!events.length && <Text fontSize="larger">Currently, there are no events 🙁</Text>}
    </>
  );
}

function Events({ events }: { events: EventType[] }) {
  return (
    // https://v2.chakra-ui.com/docs/components/simple-grid
    <SimpleGrid w="100%" h="100%" maxW="70rem" columns={{ base: 1, md: 2, lg: 3 }} spacing="40px" justifyItems="center">
      {events.map((event) => (
        // https://v2.chakra-ui.com/docs/components/card
        <Card
          key={event.id}
          width="100%"
          style={{ transition: 'all .3s ease' }}
          _hover={{ bg: color('ButtonHighlight'), transform: 'scale(1.05)' }}
        >
          {/* This is a link to another page: https://reactrouter.com/start/library/navigating#link */}
          <CardBody as={Link} to={event.id}>
            <Stack direction="column" gap="3">
              <Heading size="md">{event.title}</Heading>
              <Text mb="3">{formatDate(event.date)}</Text>
              <Image src={event.image} alt={event.title} borderRadius="md" />
              <Text mt="3" noOfLines={2}>
                {event.description}
              </Text>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
}
