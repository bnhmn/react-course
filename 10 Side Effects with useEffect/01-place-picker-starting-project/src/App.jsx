import { useRef, useState } from 'react';

import logoImg from './assets/logo.png';
import { DeleteConfirmation } from './components/DeleteConfirmation.jsx';
import { Modal } from './components/Modal.jsx';
import { Places } from './components/Places.jsx';
import { PLACES } from './lib/data.js';

export default function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState([]);

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
        <Places title="Available Places" places={PLACES} onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}
