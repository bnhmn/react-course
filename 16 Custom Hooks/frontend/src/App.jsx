import { useCallback, useRef, useState } from 'react';

import logoImg from './assets/logo.png';
import { DeleteConfirmation } from './components/DeleteConfirmation.jsx';
import { Modal } from './components/Modal.jsx';
import { Places } from './components/Places.jsx';
import { usePlacesBackend } from './hooks/backend.js';

export default function App() {
  // You can create custom hooks like 'usePlacesBackend' below to enhance readability and separation of concerns.
  // Whenever you notice that a component orchestrates numerous hooks and functions, you should consider extracting
  // the complex parts into a custom hook.

  const { isLoading, isError, places, selectedPlaces, selectPlace, unselectPlace } = usePlacesBackend();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const selectedPlace = useRef();

  const handleSelectPlace = (place) => {
    selectPlace(place);
  };

  const handleRemovePlace = useCallback(() => {
    unselectPlace(selectedPlace.current);
    setModalIsOpen(false);
  }, [unselectPlace]);

  const handleStartRemovePlace = (place) => {
    selectedPlace.current = place;
    setModalIsOpen(true);
  };

  const handleStopRemovePlace = () => {
    setModalIsOpen(false);
  };

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
          isLoading={isLoading}
          fallbackText={isError ? 'Could not fetch places 🙁' : 'Select the places you would like to visit below.'}
          places={selectedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          isLoading={isLoading}
          places={places}
          fallbackText={isError ? 'Could not fetch places 🙁' : 'No places available.'}
          onSelectPlace={handleSelectPlace}
        />
      </main>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation onCancel={handleStopRemovePlace} onConfirm={handleRemovePlace} />
      </Modal>
    </>
  );
}
