import { useEffect, useRef, useState } from 'react';
import { BackendClient } from '../lib/backend.js';
import { sortPlacesByUserDistance } from '../lib/location.js';
import { Places } from './Places.jsx';

export function AvailablePlaces({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const backend = useRef(new BackendClient());

  // You should use effects to fetch data from the backend.
  // Apart from that, it's very simple to make HTTP requests: just use fetch.
  useEffect(() => {
    backend.current
      .fetchAllPlaces()
      .then(sortPlacesByUserDistance)
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
