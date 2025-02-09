import { Heading, Text } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';

import { EventsGrid } from '../components/events/EventsGrid';
import { fetchWatchingEvents } from '../lib/backend';

// Routes can be defined via createFileRoute and createLazyFileRoute.
// Although the route path of a file route is automatically derived from the source code file path, we need
// to specify it explicitly as an argument to the function so that TypeScript knows that this path exists.
// Don't worry: the TanStack plugin will automatically adjust the path here when you move the file around.
// https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#anatomy-of-a-route

export const Route = createFileRoute('/account/watchlist')({
  // We can fetch data through a loader. TanStack executes the loader before rendering the component.
  // It caches the loader result, which makes subsequent page views significantly faster.
  // If a result is cached, it will be returned immediately, then potentially be refetched in the background.
  // https://tanstack.com/router/latest/docs/framework/react/guide/data-loading
  loader: async () => await fetchWatchingEvents(),

  component: function Component() {
    const events = Route.useLoaderData();

    return (
      <>
        <Heading mb="10">Your Watchlist</Heading>
        {events.length > 0 && <EventsGrid events={events} />}
        {events.length === 0 && <Text fontSize="larger">Your watchlist is empty</Text>}
      </>
    );
  },
});
