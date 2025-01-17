import { useEffect, useRef, useState } from 'react';

import logoImg from './assets/logo.png';
import { DeleteConfirmation } from './components/DeleteConfirmation.jsx';
import { Modal } from './components/Modal.jsx';
import { Places } from './components/Places.jsx';
import { PLACES } from './lib/data.js';
import { sortPlacesByDistance } from './lib/location.js';

export default function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [allPlaces, setAllPlaces] = useState(PLACES);
  const [pickedPlaces, setPickedPlaces] = useState([]);

  // The useEffect hook should be used to synchronize React with external systems / to trigger side effects.
  // Examples: fetch data from backend, run browser API calls, control a non-React component based on React state.
  // https://react.dev/learn/synchronizing-with-effects

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setAllPlaces(sortPlacesByDistance(allPlaces, position.coords));
    });
  }, []);

  // The first argument is the side effect function and the second argument is a list of dependencies (props or states).
  // React will first render the component, update the screen, and then run the code inside useEffect.
  // In other words, useEffect "delays" a piece of code from running until that render is reflected on the screen.
  // Every time a dependency changes, the side effect is executed again. When the dependencies are empty,
  // the side effect only runs once when the component is rendered for the first time.

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) => prevPickedPlaces.filter((place) => place.id !== selectedPlace.current));
    modal.current.close();
  }

  return (
    <>
      <Modal ref={modal}>
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
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places title="Available Places" places={allPlaces} onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}
