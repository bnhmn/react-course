import { authProvider } from './auth';

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

export async function fetchEvents(): Promise<EventType[]> {
  return await fetchFromBackend({ method: 'GET', uri: '/events' });
}

export async function fetchWatchingEvents(): Promise<EventType[]> {
  const events = await fetchEvents();
  return events.filter((event) => event.watching);
}

export async function fetchEvent(eventId: string): Promise<EventType> {
  return await fetchFromBackend({ method: 'GET', uri: `/events/${eventId}` });
}

export async function createEvent(event: NewEventType): Promise<EventType> {
  return await fetchFromBackend({ method: 'POST', uri: '/events', body: event });
}

export async function updateEvent(eventId: string, event: NewEventType): Promise<EventType> {
  return await fetchFromBackend({ method: 'PATCH', uri: `/events/${eventId}`, body: event });
}

export async function deleteEvent(eventId: string) {
  await fetchFromBackend({ method: 'DELETE', uri: `/events/${eventId}` });
}

export async function addEventToWatchlist(eventId: string) {
  await fetchFromBackend({ method: 'POST', uri: '/watchlist/items', body: { eventId } });
}

export async function removeEventFromWatchlist(eventId: string) {
  await fetchFromBackend({ method: 'DELETE', uri: `/watchlist/items/${eventId}` });
}

interface RequestType extends RequestInit {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  uri: string;
  headers?: { [key: string]: string };
  body?: any;
}

async function fetchFromBackend(request: RequestType, baseUrl = 'http://localhost:8888') {
  const requestUrl = `${baseUrl}${request.uri}`;

  const isAuthenticated = await authProvider.isAuthenticated();
  if (isAuthenticated) {
    const token = await authProvider.getAccessToken();
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
      return null;
    }
  } else {
    const responseBody = await resp.text();
    const error = `<== Received error ${resp.status} (${resp.statusText})\n${responseBody}`;
    console.error(error);
    throw error;
  }
}
