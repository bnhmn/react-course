import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { createOrder, findAllMeals } from './orders.js';
import { validateSchema, validationErrorHandler } from './validation.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(morgan('short')); // request logging https://www.npmjs.com/package/morgan
app.use(express.json());

app.get('/meals', async (req, res) => {
  const meals = await findAllMeals();
  res.json(meals);
});

app.post(
  '/orders',

  validateSchema({
    type: 'object',
    properties: {
      customer: {
        type: 'object',
        properties: {
          name: { type: 'string', pattern: '^\\S' },
          email: { type: 'string', pattern: '\\w{2,}@\\w{2,}\\.\\w{2,}' },
          street: { type: 'string', pattern: '^\\S' },
          postalCode: { type: 'string', pattern: '^\\S' },
          city: { type: 'string', pattern: '^\\S' },
        },
        required: ['name', 'email', 'street', 'postalCode', 'city'],
      },
      items: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          properties: { id: { type: 'string' }, amount: { type: 'integer', minimum: 1 } },
          required: ['id', 'amount'],
        },
      },
    },
    required: ['customer', 'items'],
  }),

  async (req, res) => {
    const newOrder = await createOrder({
      customer: {
        name: req.body.customer.name,
        email: req.body.customer.email,
        street: req.body.customer.street,
        postalCode: req.body.customer.postalCode,
        city: req.body.customer.city,
      },
      items: [
        req.body.items.map((item) => ({
          id: item.id,
          amount: item.amount,
        })),
      ],
    });
    res.status(200).json(newOrder);
  },
);

app.use(validationErrorHandler);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
