import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { downvoteOpinion, findAllOpinions, saveOpinion, upvoteOpinion } from './opinions.js';
import { validateSchema, validationErrorHandler } from './validation.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('short')); // request logging https://www.npmjs.com/package/morgan
app.use(express.json());

app.get('/opinions', async (req, res) => {
  const opinions = await findAllOpinions();
  res.json(opinions);
});

app.post(
  '/opinions',
  validateSchema({
    type: 'object',
    properties: { userName: { type: 'string' }, title: { type: 'string' }, body: { type: 'string' } },
    required: ['userName', 'title', 'body'],
  }),
  async (req, res) => {
    const { userName, title, body } = req.body;
    const savedOpinion = await saveOpinion({ userName, title, body }, 0.5);
    res.status(200).json(savedOpinion);
  },
);

app.post('/opinions/:id/upvote', async (req, res) => {
  const { id } = req.params;
  const opinion = await upvoteOpinion(parseInt(id), 0.5);
  if (opinion) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.post('/opinions/:id/downvote', async (req, res) => {
  const { id } = req.params;
  const opinion = await downvoteOpinion(parseInt(id), 0.5);
  if (opinion) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.use(validationErrorHandler);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
