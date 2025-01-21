import { useEffect, useState } from 'react';
import { BackendClient } from '../lib/backend.js';
import { Places } from './Places.jsx';

export function AvailablePlaces({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const backend = new BackendClient();

  // Use an effect to fetch data from the backend. Other than that, it's very simple: just use fetch!.
  useEffect(() => {
    backend
      .fetchAllPlaces()
      .then(setPlaces)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Places
      title="Available Places"
      places={places}
      fallbackText={isError ? 'Could not fetch places 🙁' : 'No places available.'}
      onSelectPlace={onSelectPlace}
      isLoading={isLoading}
    />
  );
}
