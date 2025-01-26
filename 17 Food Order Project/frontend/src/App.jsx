import { useState } from 'react';
import { AvailableMeals } from './components/AvailableMeals';
import { Header } from './components/Header';
import { ShoppingCartModal } from './components/ShoppingCartModal';
import { useShoppingCartStore } from './hooks/cart';

export default function App() {
  const cart = useShoppingCartStore();
  const [cartIsOpen, setCartIsOpen] = useState(false);

  return (
    <>
      <Header cart={cart} onOpenCart={() => setCartIsOpen(true)} />
      <main>
        <AvailableMeals cart={cart} />
      </main>
      <ShoppingCartModal cart={cart} open={cartIsOpen} onClose={() => setCartIsOpen(false)} />
    </>
  );
}
