import { BrowserRouter, Route, Routes } from 'react-router';

import { RootLayout } from './components/RootLayout';
import { CreateEventPage } from './routes/events/CreateEventPage';
import { ViewEventPage } from './routes/events/ViewEventPage';
import { ViewEventsPage } from './routes/events/ViewEventsPage';
import { HomePage } from './routes/HomePage';
import { NotFoundPage } from './routes/NotFoundPage';

// Using react-router, you can simulate a multi-page application with React.
// You can create multiple routes between which the user can navigate back and forth.
// https://reactrouter.com/start/library/installation
// https://reactrouter.com/start/library/routing

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout links={{ Home: '/', Events: '/events' }} />}>
          <Route path="" element={<HomePage />}></Route>
          <Route path="events">
            <Route path="" element={<ViewEventsPage />} />
            <Route path="new" element={<CreateEventPage />} />
            <Route path=":eventId" element={<ViewEventPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
