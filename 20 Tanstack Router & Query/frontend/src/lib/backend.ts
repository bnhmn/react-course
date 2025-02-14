import { QueryClient, queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { notFound } from '@tanstack/react-router';

import { authClient } from './auth-client';

export interface EventType {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  watching?: boolean;
}

export interface NewEventType {
  title: string;
  description: string;
  date: string;
  image: string;
}

// Tanstack Query simplifies data fetching with automatic caching, background refetching, and built-in error/loading
// states. It handles pagination, infinite scrolling, and declarative data fetching without extra logic.
// https://tanstack.com/query/latest/docs/framework/react/overview

// We use TanStack Query together with TanStack Router, as described on this page:
// https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading.
// In this setup, each query requires a loader to initially load data into the cache and a hook to provide data to the
// components. Thanks to caching, the user only experiences a loading delay on the first page visit. On subsequent
// visits, the cached result is displayed immediately. However, the query still runs again in the background, and once
// completed, the component re-renders to show the latest data (Stale-While-Revalidate strategy).

export const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 0 } } });

const eventsQuery = queryOptions({
  // The queryKey is the id under which the query result is stored in the cache. Multiple values can be specified.
  // When a queryKey is invalidated, all queries containing that key are removed from the cache and will be reloaded
  queryKey: ['events'],
  queryFn: ({ signal }) => fetchFromBackend<EventType[]>({ method: 'GET', uri: '/events', signal }),
});

/**
 * Ensure that the events data is loaded into the cache. Only executes the query if the cache is empty.
 */
export async function ensureEventsData(): Promise<EventType[]> {
  return await queryClient.ensureQueryData(eventsQuery);
}

/**
 * Read the events data from the cache and subscribe to updates.
 */
export function useEventsData(filter: (event: EventType) => boolean = () => true) {
  const { data: events, ...rest } = useSuspenseQuery(eventsQuery);
  return { events: events.filter(filter), ...rest };
}

/**
 * Read the event data from the cache and subscribe to updates.
 */
export function useEventData(eventId: string) {
  // We filter the event from the events data because we always load all events with it anyway
  const { data: events, ...rest } = useSuspenseQuery(eventsQuery);
  const event = events.filter((event) => event.id === eventId).at(0);
  if (!event) {
    // Note: Your components has to be wrapped in <CatchNotFound> if you want to use notFound() from within a component
    // https://tanstack.com/router/latest/docs/framework/react/guide/not-found-errors#throwing-not-found-errors-in-components
    throw notFound();
  }
  return { event, ...rest };
}

/**
 * Watch or unwatch an event.
 */
export function useWatchEventMutation(eventId: string) {
  // Mutations allow to create, delete or update data. They also allow us to do optimistic updates.
  // https://tanstack.com/query/latest/docs/framework/react/guides/mutations
  // https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates
  return useMutation({
    mutationFn: async (command: 'watch' | 'unwatch') =>
      command === 'watch'
        ? await fetchFromBackend({ method: 'POST', uri: '/watchlist/items', body: { eventId } })
        : await fetchFromBackend({ method: 'DELETE', uri: `/watchlist/items/${eventId}` }),
    onSettled: async () => {
      // Invalidate the events query. Use refetchType=all to reload the query immediately even if it's inactive.
      // https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation
      await queryClient.invalidateQueries({ queryKey: ['events'], refetchType: 'all' });
    },
  });
}

async function refreshEventsData() {
  await queryClient.invalidateQueries({ queryKey: ['events'], refetchType: 'all' });
}

export async function createEvent(event: NewEventType) {
  const createdEvent = await fetchFromBackend<EventType>({ method: 'POST', uri: '/events', body: event });
  await refreshEventsData();
  return createdEvent;
}

export async function updateEvent(eventId: string, event: NewEventType) {
  await fetchFromBackend<EventType>({ method: 'PATCH', uri: `/events/${eventId}`, body: event });
  await refreshEventsData();
}

export async function deleteEvent(eventId: string) {
  await fetchFromBackend({ method: 'DELETE', uri: `/events/${eventId}` });
  await refreshEventsData();
}

export async function addEventToWatchlist(eventId: string) {
  await fetchFromBackend({ method: 'POST', uri: '/watchlist/items', body: { eventId } });
  await refreshEventsData();
}

export async function removeEventFromWatchlist(eventId: string) {
  await fetchFromBackend({ method: 'DELETE', uri: `/watchlist/items/${eventId}` });
  await refreshEventsData();
}

interface RequestType extends RequestInit {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  uri: string;
  headers?: { [key: string]: string };
  body?: any;
}

async function fetchFromBackend<ReturnType = void>(
  request: RequestType,
  baseUrl = import.meta.env.VITE_BACKEND_URL || `${window.location.origin}/api`,
): Promise<ReturnType> {
  const requestUrl = `${baseUrl}${request.uri}`;

  // TODO: Access via context instead
  const isAuthenticated = await authClient.isAuthenticated();
  if (isAuthenticated) {
    const token = await authClient.getAccessToken();
    request.headers = request.headers ?? {};
    request.headers['Authorization'] = `Bearer ${token}`;
  }
  if (request.body) {
    request.headers = request.headers ?? {};
    request.headers['Content-Type'] = 'application/json';
    request.body = JSON.stringify(request.body);
  }

  const resp = await fetch(requestUrl, request);

  if (resp.ok) {
    if (resp.headers.get('Content-Type')?.includes('application/json')) {
      return await resp.json();
    } else {
      return null!;
    }
  } else {
    const responseBody = await resp.text();
    const error = `<== Received error ${resp.status} (${resp.statusText})\n${responseBody}`;
    console.error(error);
    if (resp.status === 404) {
      // https://tanstack.com/router/latest/docs/framework/react/guide/not-found-errors
      throw notFound();
    } else {
      throw error;
    }
  }
}
