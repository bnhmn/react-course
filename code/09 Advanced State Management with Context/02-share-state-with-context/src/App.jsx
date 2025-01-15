import { useState } from 'react';

import { Header } from './components/Header.jsx';
import { Shop } from './components/Shop.jsx';
import { addProductToCart, changeProductQuantity } from './lib/carts.js';
import { CartContext } from './store/cart-context.jsx';

export default function App() {
  const [cart, setCart] = useState({ items: [] });
  const cartContext = {
    ...cart,
    addCartItem: (productId) => {
      setCart((prevCart) => addProductToCart(prevCart, productId));
    },
    changeItemQuantity: (productId, amount) => {
      setCart((prevCart) => changeProductQuantity(prevCart, productId, amount));
    },
  };

  // This is an example of creating a context and connecting it to a state.
  // All components within <CartContext></CartContext> can access the cart context.
  // Whenever the state changes, all components that use the context are rerendered.
  return (
    <CartContext value={cartContext}>
      <Header />
      <Shop />
    </CartContext>
  );
}
