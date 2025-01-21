import { useEffect, useRef, useState } from 'react';

import { BackendClient } from '../lib/backend';
import { sortPlacesByUserDistance } from '../lib/location';

// You can create custom React hooks by composing other hooks, to enhance separation of concerns and encapsulation.
// Note that your custom hook's name must start with 'use'.
// https://react.dev/learn/reusing-logic-with-custom-hooks#custom-hooks-sharing-logic-between-components

export function usePlacesBackend(baseUrl = 'http://localhost:3000') {
  const backend = useRef(new BackendClient(baseUrl));
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [places, setPlacesState] = useState([]);
  const [selectedPlaces, setSelectedPlacesState] = useState([]);

  // Use an effect to fetch the initial data from the backend
  useEffect(() => {
    Promise.all([
      backend.current.fetchAvailablePlaces().then(sortPlacesByUserDistance).then(setPlacesState),
      backend.current.fetchSelectedPlaces().then(sortPlacesByUserDistance).then(setSelectedPlacesState),
    ])
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  function setSelectedPlaces(newSelectedPlaces) {
    backend.current
      .setSelectedPlaces(newSelectedPlaces)
      .then(sortPlacesByUserDistance)
      .then(setSelectedPlacesState)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }

  function selectPlace(place) {
    setSelectedPlaces(
      selectedPlaces.some((item) => item.id === place.id) ? selectedPlaces : [...selectedPlaces, place],
    );
  }

  function unselectPlace(place) {
    setSelectedPlaces(selectedPlaces.filter((item) => item.id !== place.id));
  }

  return { isLoading, isError, places, selectedPlaces, selectPlace, unselectPlace };
}
