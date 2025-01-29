import { Link as RouterLink } from 'react-router';

import { Button, Heading, Text } from '@chakra-ui/react';

interface ViewEventsProps {
  events?: {
    id: string;
    title: string;
    date: string;
    image: string;
    description: string;
  }[];
}

const defaultEvents = [
  {
    id: 'e1',
    title: 'A dummy event',
    date: '2023-02-22',
    image: 'https://blog.hubspot.de/hubfs/Germany/Blog_images/Optimize_Marketing%20Events%20DACH%202021.jpg',
    description: 'Join this amazing event and connect with fellow developers.',
  },
  {
    id: 'e2',
    title: 'Another dummy event',
    date: '2023-02-22',
    image: 'https://blog.hubspot.de/hubfs/Germany/Blog_images/Optimize_Marketing%20Events%20DACH%202021.jpg',
    description: 'Join this amazing event and connect with fellow developers.',
  },
];

export function ViewEventsPage({ events = defaultEvents }: ViewEventsProps) {
  return (
    <>
      <Heading>Events</Heading>
      <Text>Hello World!</Text>
      {events.map((event) => (
        <div key={event.id}>
          {/* This is a relative link: https://reactrouter.com/start/library/navigating#link */}
          <Button as={RouterLink} to={event.id} variant="link">
            {event.title}
          </Button>
        </div>
      ))}
    </>
  );
}
