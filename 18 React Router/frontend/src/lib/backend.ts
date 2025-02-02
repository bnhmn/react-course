import { useCallback, useEffect, useState } from 'react';

export interface EventType {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

export interface EventUpdateType {
  title: string;
  description: string;
  date: string;
  image: string;
}

export function useEventsBackend() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchFromBackend({ method: 'GET', uri: '/events' })
      .then(setEvents)
      .finally(() => setIsLoading(false));
  }, []);

  const createEvent = useCallback(
    async (event: { title: string; description: string; date: string; image: string }) => {
      setIsLoading(true);
      await fetchFromBackend({ method: 'POST', uri: '/events', body: event })
        .then(() => setIsSuccess(true))
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    },
    [],
  );

  return { events, createEvent, isLoading, isSuccess, isError };
}

export function useEventBackend(eventId: string) {
  const [event, setEvent] = useState<EventType>();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatePending, setIsUpdatePending] = useState(false);

  useEffect(() => {
    fetchFromBackend({ method: 'GET', uri: `/events/${eventId}` })
      .then(setEvent)
      .finally(() => setIsLoading(false));
  }, [eventId]);

  const updateEvent = useCallback(
    async (event: EventUpdateType) => {
      console.log(event);
      setIsUpdatePending(true);
      await fetchFromBackend({ method: 'PATCH', uri: `/events/${eventId}`, body: event })
        .then(setEvent)
        .finally(() => setIsUpdatePending(false));
    },
    [eventId],
  );

  const deleteEvent = useCallback(async () => {
    setIsUpdatePending(true);
    await fetchFromBackend({ method: 'DELETE', uri: `/events/${eventId}` }).finally(() => setIsUpdatePending(false));
  }, [eventId]);

  return { event, updateEvent, deleteEvent, isLoading, isUpdatePending };
}

interface RequestType extends RequestInit {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  uri: string;
  headers?: { [key: string]: string };
  body?: any;
}

async function fetchFromBackend(request: RequestType, baseUrl = 'http://localhost:8888') {
  const requestUrl = `${baseUrl}${request.uri}`;

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
