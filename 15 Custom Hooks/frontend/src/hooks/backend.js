import { useEffect, useRef, useState } from 'react';

import { useCallback } from 'react';
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
  const selectPlaceFn = useRef();
  const unselectPlaceFn = useRef();

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

  selectPlaceFn.current = (place) => {
    setSelectedPlaces(
      selectedPlaces.some((item) => item.id === place.id) ? selectedPlaces : [...selectedPlaces, place],
    );
  };

  unselectPlaceFn.current = (place) => {
    setSelectedPlaces(selectedPlaces.filter((item) => item.id !== place.id));
  };

  // We should wrap our functions with useCallback so the caller can use them as effect dependencies.
  // https://react.dev/reference/react/useCallback#optimizing-a-custom-hook
  //
  // Wrapping our callback functions first in a Ref and then using useCallback is a workaround to make them stable.
  // The external functions are stable (they do not change because they access via Ref),
  // while the internal functions are not stable (they change each time the 'selectedPlaces' change).

  const selectPlace = useCallback((place) => selectPlaceFn.current(place), []);
  const unselectPlace = useCallback((place) => unselectPlaceFn.current(place), []);

  return { isLoading, isError, places, selectedPlaces, selectPlace, unselectPlace };
}
