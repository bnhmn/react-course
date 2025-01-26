import { useState } from 'react';
import { AvailableMeals } from './components/AvailableMeals';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import { useShoppingCartStore } from './hooks/cart';

export default function App() {
  const cart = useShoppingCartStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <Header cart={cart} onOpenCart={() => setModalIsOpen(true)} />
      <main>
        <AvailableMeals cart={cart} />
      </main>
      <Modal cart={cart} open={modalIsOpen} onClose={() => setModalIsOpen(false)} />
    </>
  );
}
