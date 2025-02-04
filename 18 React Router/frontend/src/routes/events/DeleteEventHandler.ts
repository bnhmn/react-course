import { LoaderFunctionArgs, redirect } from 'react-router';

import { deleteEvent } from '../../lib/backend';

export async function handleDeleteEvent({ params }: LoaderFunctionArgs) {
  const eventId = params.eventId!;
  await deleteEvent(eventId);
  return redirect('/events');
}
