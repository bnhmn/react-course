import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';

import { Spinner } from '@chakra-ui/react';

import { GenericErrorPage, LoginErrorPage, NotFoundPage } from '../components/ErrorPages.tsx';
import { LoadingSpinner } from '../components/navigation/LoadingSpinner.tsx';
import { ensureUserIsAuthenticated, loadAuthContext, loginCallbackAction } from '../lib/auth.ts';
import { fetchEvents, fetchWatchingEvents } from '../lib/backend.ts';
import { ViewEventPage } from '../routes/events.$eventId.index.tsx';
import { ViewEventsPage } from '../routes/events.index.tsx';
import { ViewAccountPage } from './account/ViewAccountPage.tsx';
import { ViewWatchlistPage } from './account/ViewWatchlistPage.tsx';
import { createEventAction } from './events/CreateEventHandler.ts';
import { CreateEventPage } from './events/CreateEventPage.tsx';
import { changeEventAction } from './events/EditEventHandler.ts';
import { EditEventPage } from './events/EditEventPage.tsx';
import { LoginPage } from './LoginPage.tsx';

// Using react-router, you can simulate a multi-page application with React.
// You can create multiple routes between which the user can navigate back and forth.
// https://reactrouter.com/en/6.29.0/

export default function App() {
  const navLinks = { Home: '/', Events: '/events' };
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route
            element={<RootLayout links={navLinks} />}
            id="auth"
            loader={loadAuthContext}
            hydrateFallbackElement={<LoadingSpinner />}
          >
            <Route hydrateFallbackElement={<Spinner />} errorElement={<GenericErrorPage />}>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/events" id="events" loader={fetchEvents}>
                <Route path="" element={<ViewEventsPage />} />
                <Route path="new" element={<CreateEventPage />} action={createEventAction} />
                <Route path=":eventId" element={<ViewEventPage />} action={changeEventAction} />
                <Route path=":eventId/edit" element={<EditEventPage />} action={changeEventAction} />
              </Route>
              <Route path="/account" loader={ensureUserIsAuthenticated}>
                <Route path="" element={<ViewAccountPage />} />
                <Route path="watchlist" element={<ViewWatchlistPage />} loader={fetchWatchingEvents} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login/callback" element={<LoginErrorPage />} loader={loginCallbackAction} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>,
        ),
      )}
    />
  );
}
