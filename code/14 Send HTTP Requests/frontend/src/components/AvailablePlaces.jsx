import { useEffect, useState } from 'react';
import { BackendClient } from '../lib/backend.js';
import { Places } from './Places.jsx';

export function AvailablePlaces({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);
  const backend = new BackendClient();

  useEffect(() => {
    backend.fetchAllPlaces().then(setPlaces);
  }, []);

  return (
    <Places
      title="Available Places"
      places={places}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
