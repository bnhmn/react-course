import fs from 'node:fs/promises';

import cors from 'cors';
import express from 'express';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('images'));
app.use(express.json());

app.get('/places', async (req, res) => {
  const fileContent = await fs.readFile('./data/places.json');
  const placesData = JSON.parse(fileContent);
  res.status(200).json({ places: placesData });
});

app.get('/places/selected', async (req, res) => {
  const fileContent = await fs.readFile('./data/selected.json');
  const places = JSON.parse(fileContent);
  res.status(200).json({ places });
});

app.put('/places/selected', async (req, res) => {
  const places = req.body.places;
  await fs.writeFile('./data/selected.json', JSON.stringify(places));
  res.status(200).json({ message: 'User places updated!' });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
