import { QueryClient, queryOptions, useSuspenseQuery } from '@tanstack/react-query';
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

export const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 0 } } });

// We use TanStack Query together with TanStack Router, as described on this page:
// https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading.
// In this setup, each query requires a loader to initially load data into the cache and a hook to provide data to the
// components. Thanks to caching, the user only experiences a loading delay on the first page visit. On subsequent
// visits, the cached result is displayed immediately. However, the query still runs again in the background, and once
// completed, the component re-renders to show the latest data if changes occurred on the server in the meantime
// (Stale-While-Revalidate strategy).

const eventsQuery = queryOptions({
  // The queryKey is the id under which the query result is stored in the cache. Multiple values can be specified.
  // When a queryKey is invalidated, all queries containing that key are removed from the cache and will be reloaded
  // the next time they are requested.
  queryKey: ['events'],
  queryFn: ({ signal }) => fetchFromBackend<EventType[]>({ method: 'GET', uri: '/events', signal }),
});

const eventQuery = (eventId: string) =>
  queryOptions({
    queryKey: ['events', eventId],
    queryFn: ({ signal }) => fetchFromBackend<EventType>({ method: 'GET', uri: `/events/${eventId}`, signal }),
  });

/**
 * Ensure that the events data is loaded into the cache. Only executes the query if the cache is empty.
 */
export async function ensureEventsData(): Promise<EventType[]> {
  return await queryClient.ensureQueryData(eventsQuery);
}

export async function ensureEventData(eventId: string): Promise<EventType> {
  return await queryClient.ensureQueryData(eventQuery(eventId));
}

/**
 * Read the events data from the cache and subscribe to updates.
 */
export function useEventsData(filter: (event: EventType) => boolean = () => true) {
  const { data, ...rest } = useSuspenseQuery(eventsQuery);
  return { events: data.filter(filter), ...rest };
}

export function useEventData(eventId: string) {
  const { data, ...rest } = useSuspenseQuery(eventQuery(eventId));
  return { event: data, ...rest };
}

/**
 * Clear the events data cache.
 */
async function invalidateEventsData() {
  // We use removeQueries so the router reloads the data via the loader and waits to re-render until the data is there.
  // https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation
  // https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientremovequeries
  queryClient.removeQueries({ queryKey: ['events'] });
}

async function invalidateEventData(eventId: string) {
  queryClient.removeQueries({ queryKey: ['events'] });
  queryClient.removeQueries({ queryKey: ['events', eventId] });
}

export async function createEvent(event: NewEventType) {
  const createdEvent = await fetchFromBackend<EventType>({ method: 'POST', uri: '/events', body: event });
  await invalidateEventsData();
  return createdEvent;
}

export async function updateEvent(eventId: string, event: NewEventType) {
  const updatedEvent = await fetchFromBackend<EventType>({ method: 'PATCH', uri: `/events/${eventId}`, body: event });
  await invalidateEventData(eventId);
  return updatedEvent;
}

export async function deleteEvent(eventId: string) {
  await fetchFromBackend({ method: 'DELETE', uri: `/events/${eventId}` });
  await invalidateEventsData();
}

export async function addEventToWatchlist(eventId: string) {
  await fetchFromBackend({ method: 'POST', uri: '/watchlist/items', body: { eventId } });
  await invalidateEventsData();
}

export async function removeEventFromWatchlist(eventId: string) {
  await fetchFromBackend({ method: 'DELETE', uri: `/watchlist/items/${eventId}` });
  await invalidateEventsData();
}

interface RequestType extends RequestInit {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  uri: string;
  headers?: { [key: string]: string };
  body?: any;
}

async function fetchFromBackend<ReturnType = void>(
  request: RequestType,
  baseUrl = 'http://localhost:8888',
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
