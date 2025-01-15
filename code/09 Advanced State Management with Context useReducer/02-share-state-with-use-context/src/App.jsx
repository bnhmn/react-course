import { useState } from 'react';

import { Header } from './components/Header.jsx';
import { Shop } from './components/Shop.jsx';
import { addProductToCart, changeProductQuantity } from './lib/carts.js';

export default function App() {
  const [cart, setCart] = useState({ items: [] });

  const handleAddCartItem = (productId) => {
    setCart((prevCart) => addProductToCart(prevCart, productId));
  };
  const handleChangeItemQuantity = (productId, amount) => {
    setCart((prevCart) => changeProductQuantity(prevCart, productId, amount));
  };

  return (
    <>
      <Header cart={cart} onChangeItemQuantity={handleChangeItemQuantity} />
      <Shop onAddCartItem={handleAddCartItem} />
    </>
  );
}
