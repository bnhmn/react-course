import { useEffect, useRef, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import { useCallback } from 'react';
import logoImg from './assets/logo.png';
import { DeleteConfirmation } from './components/DeleteConfirmation.jsx';
import { Modal } from './components/Modal.jsx';
import { Places } from './components/Places.jsx';
import { PLACES } from './lib/data.js';
import { sortPlacesByDistance } from './lib/location.js';

export default function App() {
  const [userLocation, setUserLocation] = useState();
  const [pickedPlaces, setPickedPlaces] = useLocalStorageState('picked-places', { defaultValue: [] });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const allPlacesSorted = sortPlacesByDistance(PLACES, userLocation);
  const pickedPlacesSorted = sortPlacesByDistance(pickedPlaces, userLocation);
  const selectedPlace = useRef();

  // The useEffect hook should be used to synchronize React with external systems / to trigger side effects.
  // Examples: fetch data from backend, run browser API calls, control a non-React component based on React state.
  // In this case, we are fetching the user's location from the browser.
  // Note that we don't need effects when calling external systems in response to a user event like a button click.
  // We only need effects when we have to call external systems as a side effect of rendering itself.
  // We should only use effects when they are required: https://react.dev/learn/synchronizing-with-effects

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
    });
  }, []);

  // The first argument is the side effect function and the second argument is a list of dependencies (props or states).
  // React will first render the component, update the screen, and then run the code inside useEffect.
  // In other words, useEffect "delays" a piece of code from running until that render is reflected on the screen.
  // Every time a dependency changes, the side effect is executed again. When the dependencies are empty,
  // the side effect only runs once when the component is rendered for the first time.

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = allPlacesSorted.find((place) => place.id === id);
      return [...prevPickedPlaces, place];
    });
  }

  // You need to wrap your callback function with 'useCallback' when an effect depends on your function.
  // It ensures that the function remains constant across render cycles if its dependencies do not change.
  // See https://react.dev/reference/react/useCallback#preventing-an-effect-from-firing-too-often.
  // Note: We don't need to add the state setters as dependencies here because React state setters are constant.

  const handleRemovePlace = useCallback(() => {
    setPickedPlaces((prevPickedPlaces) => prevPickedPlaces.filter((place) => place.id !== selectedPlace.current));
    setModalIsOpen(false);
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation onCancel={handleStopRemovePlace} onConfirm={handleRemovePlace} />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>Create your personal collection of places you would like to visit or you have visited.</p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlacesSorted}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places title="Available Places" places={allPlacesSorted} onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}
