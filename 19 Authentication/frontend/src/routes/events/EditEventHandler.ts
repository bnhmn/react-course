import { LoaderFunctionArgs, redirect } from 'react-router';

import * as backend from '../../lib/backend';

// https://reactrouter.com/6.29.0/route/action
// https://reactrouter.com/6.29.0/route/loader#returning-responses
// https://reactrouter.com/en/6.29.0/route/action#handling-multiple-actions-per-route

export async function changeEventAction({ request, params }: LoaderFunctionArgs) {
  const eventId = params.eventId!;
  const { command, ...payload } = Object.fromEntries(await request.formData()) as any;
  switch (command) {
    case 'edit':
      await backend.updateEvent(eventId, payload);
      return redirect(`/events/${eventId}`);
    case 'watch':
      await backend.addEventToWatchlist(eventId);
      return; // https://reactrouter.com/en/6.29.0/start/tutorial#mutations-without-navigation
    case 'unwatch':
      await backend.removeEventFromWatchlist(eventId);
      return; // https://reactrouter.com/en/6.29.0/start/tutorial#mutations-without-navigation
    case 'delete':
      await backend.deleteEvent(eventId);
      return redirect(`/events`);
  }
}
