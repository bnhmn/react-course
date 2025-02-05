import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { addEvent, deleteEventById, findAllEvents, findEventById, replaceEvent } from './events.js';
import { Joi, validate, validationErrorHandler } from './validation.js';
import { addToWatchlist, findAllWatchlistItems, removeFromWatchlist } from './watchlist.js';

const app = express();
const port = 8888;

app.use(cors());
app.use(morgan('short')); // request logging https://www.npmjs.com/package/morgan
app.use(express.json());

app.get('/events', async (req, res) => {
  const events = await findAllEvents();
  res.json(events);
});

app.get('/events/:id', async (req, res) => {
  const event = await findEventById(req.params.id);
  if (!event) {
    res.status(404).send();
  } else {
    res.status(200).json(event);
  }
});

app.post(
  '/events',
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
  '/events/:id',
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

app.delete('/events/:id', async (req, res) => {
  const deletedEvent = await deleteEventById(req.params.id);
  if (!deletedEvent) {
    res.status(404).send();
  } else {
    res.status(204).send();
  }
});

app.get('/watchlist/items', async (req, res) => {
  const items = await findAllWatchlistItems();
  res.json(items);
});

app.post(
  '/watchlist/items',
  validate({
    body: Joi.object({
      eventId: Joi.string().trim().pattern(/e\d+/).required(),
    }),
  }),
  async (req, res) => {
    await addToWatchlist(req.body.eventId);
    res.status(204).send();
  },
);

app.delete('/watchlist/items/:eventId', async (req, res) => {
  await removeFromWatchlist(req.params.eventId);
  res.status(204).send();
});

app.listen(8080);

app.use(validationErrorHandler);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
