import { LoaderFunctionArgs, redirect } from 'react-router';

import { createEvent, NewEventType } from '../../lib/backend';

// https://reactrouter.com/6.29.0/route/action
// https://reactrouter.com/6.29.0/route/loader#returning-responses

export async function createEventAction({ request }: LoaderFunctionArgs) {
  const eventData = Object.fromEntries(await request.formData()) as unknown as NewEventType;
  await createEvent(eventData);
  return redirect('/events');
}
