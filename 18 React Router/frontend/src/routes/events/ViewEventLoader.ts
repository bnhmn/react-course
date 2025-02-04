import { LoaderFunctionArgs } from 'react-router';

import { fetchEvent, fetchEvents } from '../../lib/backend';

export async function loadEvents() {
  return await fetchEvents();
}

export async function loadEvent({ params }: LoaderFunctionArgs) {
  return await fetchEvent(params.eventId!);
}
