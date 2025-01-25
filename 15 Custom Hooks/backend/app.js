import fs from 'node:fs/promises';

import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(morgan('short')); // request logging https://www.npmjs.com/package/morgan
app.use(express.json());

const selectedPlaces = [];

app.get('/places', async (req, res) => {
  const fileContent = await fs.readFile('./data/places.json');
  const places = JSON.parse(fileContent);
  setTimeout(() => res.status(200).json({ places: places }), 200);
});

app.get('/places/selected', async (req, res) => {
  setTimeout(() => res.status(200).json({ places: selectedPlaces }), 200);
});

app.put('/places/selected', async (req, res) => {
  const places = req.body.places;
  selectedPlaces.length = 0;
  selectedPlaces.push(...places);
  res.status(200).json({ places: selectedPlaces });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
