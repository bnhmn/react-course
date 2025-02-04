import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';

import { Spinner } from '@chakra-ui/react';

import { RootLayout } from './components/RootLayout';
import { ErrorPage } from './routes/ErrorPage';
import { CreateEventPage } from './routes/events/CreateEventPage';
import { handleEditEvent } from './routes/events/EditEventHandler';
import { EditEventPage } from './routes/events/EditEventPage';
import { loadEvent, loadEvents } from './routes/events/ViewEventLoader.ts';
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
          <Route element={<RootLayout links={navLinks} />}>
            <Route hydrateFallbackElement={<Spinner />} errorElement={<ErrorPage />}>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/events">
                <Route path="" element={<ViewEventsPage />} loader={loadEvents} />
                <Route path="new" element={<CreateEventPage />} />
                <Route path=":eventId" id="event" loader={loadEvent}>
                  <Route path="" element={<ViewEventPage />} />
                  <Route path="edit" element={<EditEventPage />} action={handleEditEvent} />
                </Route>
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>,
        ),
      )}
    />
  );
}
