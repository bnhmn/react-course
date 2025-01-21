import { useEffect, useState } from 'react';
import { BackendClient } from '../lib/backend.js';
import { Places } from './Places.jsx';

export function AvailablePlaces({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const backend = new BackendClient();

  // Use an effect to fetch data from the backend. Other than that, it's very simple: just use fetch!.

  useEffect(() => {
    backend
      .fetchAllPlaces()
      .then(setPlaces)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Places
      title="Available Places"
      places={places}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      isLoading={isLoading}
    />
  );
}
