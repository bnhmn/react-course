import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';

import { Navigation } from './components/Navigation';
import { RootLayout } from './components/RootLayout';
import { fetchEvent, fetchEvents } from './lib/backend';
import { CreateEventPage } from './routes/events/CreateEventPage';
import { ViewEventPage } from './routes/events/ViewEventPage';
import { ViewEventsPage } from './routes/events/ViewEventsPage';
import { HomePage } from './routes/HomePage';
import { NotFoundPage } from './routes/NotFoundPage';

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
            path="/"
            element={<RootLayout links={navLinks} />}
            hydrateFallbackElement={<Navigation links={navLinks} isLoading />}
          >
            <Route path="" element={<HomePage />}></Route>
            <Route path="events">
              <Route path="" element={<ViewEventsPage />} loader={fetchEvents} />
              <Route path="new" element={<CreateEventPage />} />
              <Route path=":eventId" element={<ViewEventPage />} loader={fetchEvent} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>,
        ),
      )}
    />
  );
}
