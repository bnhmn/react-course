import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { authErrorHandler, optionalAuth, requiresAdminPermission, requiresAuth } from './auth.js';
import { addEvent, deleteEventById, findAllEvents, findEventById, replaceEvent } from './events.js';
import { internalServerErrorHandler, Joi, validate, validationErrorHandler } from './validation.js';
import { addToWatchlist, removeFromWatchlist } from './watchlist.js';

const app = express();
const port = parseInt(process.env.PORT || '80');

app.use(cors());
app.use(express.static('public')); // Serve frontend files from public folder
app.use(morgan('short')); // request logging https://www.npmjs.com/package/morgan
app.use(express.json());

app.get('/api/events', optionalAuth, async (req, res) => {
  const userId = req.auth?.payload?.sub;
  const events = await findAllEvents(userId);
  res.json(events);
});

app.get('/api/events/:id', optionalAuth, async (req, res) => {
  const userId = req.auth?.payload?.sub;
  const event = await findEventById(userId, req.params.id);
  if (!event) {
    res.status(404).send();
  } else {
    res.status(200).json(event);
  }
});

app.post(
  '/api/events',
  requiresAuth,
  requiresAdminPermission,
  validate({
    body: Joi.object({
      title: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      date: Joi.string()
        .pattern(/\d{4}-\d{2}-\d{2}/)
        .required(),
      image: Joi.string()
        .uri({ scheme: /https?/ })
        .required(),
    }),
  }),
  async (req, res) => {
    const newEvent = await addEvent(req.body);
    res.status(200).json(newEvent);
  },
);

app.patch(
  '/api/events/:id',
  requiresAuth,
  requiresAdminPermission,
  validate({
    body: Joi.object({
      title: Joi.string().trim().min(1).required(),
      description: Joi.string().trim().min(1).required(),
      date: Joi.string()
        .pattern(/\d{4}-\d{2}-\d{2}/)
        .required(),
      image: Joi.string()
        .uri({ scheme: /https?/ })
        .required(),
    }),
  }),
  async (req, res) => {
    const eventId = req.params.id;
    const newEvent = await replaceEvent(eventId, req.body);
    if (!newEvent) {
      res.status(404).send();
    } else {
      res.status(200).json(newEvent);
    }
  },
);

app.delete('/api/events/:id', requiresAuth, requiresAdminPermission, async (req, res) => {
  const deletedEvent = await deleteEventById(req.params.id);
  if (!deletedEvent) {
    res.status(404).send();
  } else {
    res.status(204).send();
  }
});

app.post(
  '/api/watchlist/items',
  requiresAuth,
  validate({
    body: Joi.object({
      eventId: Joi.string().trim().pattern(/e\d+/).required(),
    }),
  }),
  async (req, res) => {
    const userId = req.auth.payload.sub;
    const eventId = req.body.eventId;
    await addToWatchlist(userId, eventId);
    res.status(204).send();
  },
);

app.delete('/api/watchlist/items/:eventId', requiresAuth, async (req, res) => {
  const userId = req.auth.payload.sub;
  const eventId = req.params.eventId;
  await removeFromWatchlist(userId, eventId);
  res.status(204).send();
});

// Required to redirect all other routes to the Single Page Application
app.use('*', (req, res) => res.sendFile(process.cwd() + '/public/index.html'));

app.use(authErrorHandler);
app.use(validationErrorHandler);
app.use(internalServerErrorHandler);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
