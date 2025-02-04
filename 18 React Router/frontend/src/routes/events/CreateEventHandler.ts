import { LoaderFunctionArgs, redirect } from 'react-router';

import { createEvent, NewEventType } from '../../lib/backend';

export async function handleCreateEvent({ request }: LoaderFunctionArgs) {
  const eventData = Object.fromEntries(await request.formData()) as unknown as NewEventType;
  await createEvent(eventData);
  return redirect('..');
}
