import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';

import { Spinner } from '@chakra-ui/react';

import { RootLayout } from './components/RootLayout.tsx';
import { authContextLoader, loginCallbackAction, requireUserLogin } from './lib/auth.ts';
import { fetchEvents, fetchWatchingEvents } from './lib/backend.ts';
import { ViewAccountPage } from './routes/account/ViewAccountPage.tsx';
import { ViewWatchlistPage } from './routes/account/ViewWatchlistPage.tsx';
import { GenericErrorPage, LoginErrorPage, NotFoundPage } from './routes/ErrorPages.tsx';
import { createEventAction } from './routes/events/CreateEventHandler.ts';
import { CreateEventPage } from './routes/events/CreateEventPage.tsx';
import { changeEventAction } from './routes/events/EditEventHandler.ts';
import { EditEventPage } from './routes/events/EditEventPage.tsx';
import { ViewEventPage } from './routes/events/ViewEventPage.tsx';
import { ViewEventsPage } from './routes/events/ViewEventsPage.tsx';
import { HomePage } from './routes/HomePage.tsx';
import { LoadingPage } from './routes/LoadingPage.tsx';
import { LoginPage } from './routes/LoginPage.tsx';

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
            loader={authContextLoader}
            hydrateFallbackElement={<LoadingPage />}
          >
            <Route hydrateFallbackElement={<Spinner />} errorElement={<GenericErrorPage />}>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/events" id="events" loader={fetchEvents}>
                <Route path="" element={<ViewEventsPage />} />
                <Route path="new" element={<CreateEventPage />} action={createEventAction} />
                <Route path=":eventId" element={<ViewEventPage />} action={changeEventAction} />
                <Route path=":eventId/edit" element={<EditEventPage />} action={changeEventAction} />
              </Route>
              <Route path="/account" loader={requireUserLogin}>
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
