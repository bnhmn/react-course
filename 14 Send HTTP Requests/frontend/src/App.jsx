import { useCallback, useRef, useState } from 'react';

import { useEffect } from 'react';
import logoImg from './assets/logo.png';
import { AvailablePlaces } from './components/AvailablePlaces.jsx';
import { DeleteConfirmation } from './components/DeleteConfirmation.jsx';
import { Modal } from './components/Modal.jsx';
import { Places } from './components/Places.jsx';
import { BackendClient } from './lib/backend.js';

export default function App() {
  const [selectedPlaces, setSelectedPlaces] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const selectedPlace = useRef();
  const backend = useRef(new BackendClient());

  // You should use effects to fetch data from the backend.
  // See also AvailablePlaces.jsx for another example.

  useEffect(() => {
    if (selectedPlaces === null) {
      backend.current.fetchSelectedPlaces().then(setSelectedPlaces);
    } else {
      backend.current.setSelectedPlaces(selectedPlaces);
    }
  }, [selectedPlaces]);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(selectedPlace) {
    setSelectedPlaces((places) =>
      places.some((place) => place.id === selectedPlace.id) ? places : [...places, selectedPlace],
    );
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setSelectedPlaces((prevPickedPlaces) => prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id));
    setModalIsOpen(false);
  }, []);

  return (
    <>
      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>Create your personal collection of places you would like to visit or you have visited.</p>
      </header>

      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={selectedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation onCancel={handleStopRemovePlace} onConfirm={handleRemovePlace} />
      </Modal>
    </>
  );
}
