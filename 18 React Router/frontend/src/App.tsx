import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';

import { Spinner } from '@chakra-ui/react';

import { RootLayout } from './components/RootLayout';
import { fetchEvents, fetchWatchlist } from './lib/backend.ts';
import { GenericErrorPage, NotFoundPage } from './routes/ErrorPages.tsx';
import { handleCreateEvent } from './routes/events/CreateEventHandler.ts';
import { CreateEventPage } from './routes/events/CreateEventPage';
import { handleDeleteEvent } from './routes/events/DeleteEventHandler.ts';
import { handleEditEvent } from './routes/events/EditEventHandler';
import { EditEventPage } from './routes/events/EditEventPage';
import { ViewEventPage } from './routes/events/ViewEventPage';
import { ViewEventsPage } from './routes/events/ViewEventsPage';
import { HomePage } from './routes/HomePage';
import { ViewWatchlistPage } from './routes/watchlist/ViewWatchlistPage.tsx';

// Using react-router, you can simulate a multi-page application with React.
// You can create multiple routes between which the user can navigate back and forth.
// https://reactrouter.com/en/6.29.0/

export default function App() {
  const navLinks = { Home: '/', Events: '/events', Watchlist: '/watchlist' };
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route element={<RootLayout links={navLinks} />}>
            <Route hydrateFallbackElement={<Spinner />} errorElement={<GenericErrorPage />}>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/events" id="events" loader={fetchEvents}>
                <Route path="" element={<ViewEventsPage />} />
                <Route path="new" element={<CreateEventPage />} action={handleCreateEvent} />
                <Route path=":eventId" element={<ViewEventPage />} action={handleDeleteEvent} />
                <Route path=":eventId/edit" element={<EditEventPage />} action={handleEditEvent} />
              </Route>
              <Route path="/watchlist" element={<ViewWatchlistPage />} loader={fetchWatchlist} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>,
        ),
      )}
    />
  );
}
