import { useCallback, useEffect, useState } from 'react';

export interface EventType {
  id: string;
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

  const createEvent = useCallback((event: { title: string; description: string; date: string; image: string }) => {
    setIsLoading(true);
    fetchFromBackend({ method: 'POST', uri: '/events', body: event })
      .then(() => setIsSuccess(true))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return { events, createEvent, isLoading, isSuccess, isError };
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
