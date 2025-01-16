import { useRef } from 'react';
import { computeNumCartItems, useShoppingCartStore } from '../store/shoppingCart';
import { CartModal } from './CartModal';

export function Header({}) {
  // With the useCartStore hook we can access the shared state value.
  const cart = useShoppingCartStore();
  const numCartItems = computeNumCartItems(cart);
  const modal = useRef();
  const handleOpenCart = () => modal.current.open();

  return (
    <>
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCart}>Cart ({numCartItems})</button>
        </p>
      </header>
      <CartModal
        ref={modal}
        title="Your Cart"
        actions={
          numCartItems > 0 ? (
            <>
              <button>Close</button>
              <button>Checkout</button>
            </>
          ) : (
            <button>Close</button>
          )
        }
      />
    </>
  );
}
