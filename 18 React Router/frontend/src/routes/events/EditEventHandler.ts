import { LoaderFunctionArgs, redirect } from 'react-router';

import { NewEventType, updateEvent } from '../../lib/backend';

export async function handleEditEvent({ request, params }: LoaderFunctionArgs) {
  const eventId = params.eventId!;
  const eventData = Object.fromEntries(await request.formData()) as unknown as NewEventType;
  await updateEvent(eventId, eventData);
  return redirect('..');
}
