import { BrowserRouter, Route, Routes } from 'react-router';

import { RootLayout } from './components/RootLayout';
import { CreateEventPage } from './routes/events/CreateEventPage';
import { EditEventPage } from './routes/events/EditEventPage';
import { ViewEventPage } from './routes/events/ViewEventPage';
import { ViewEventsPage } from './routes/events/ViewEventsPage';
import { HomePage } from './routes/HomePage';

// Using react-router, you can simulate a multi-page application with React.
// You can create multiple routes between which the user can navigate back and forth.
// https://reactrouter.com/start/library/installation
// https://reactrouter.com/start/library/routing

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout links={{ Home: '/', Events: '/events' }} />}>
          <Route index element={<HomePage />}></Route>
          <Route path="events" element={<ViewEventsPage />}></Route>
          <Route path="events/new" element={<CreateEventPage />}></Route>
          <Route path="events/:id" element={<ViewEventPage />}></Route>
          <Route path="events/:id/edit" element={<EditEventPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
