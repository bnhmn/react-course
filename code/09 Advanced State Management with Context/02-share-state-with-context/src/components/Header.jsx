import { useContext, useRef } from 'react';
import { computeNumCartItems } from '../lib/carts';
import { CartContext } from '../store/cart-context';
import { CartModal } from './CartModal';

export function Header({}) {
  // With the useContext hook we can access the shared context value.
  const cart = useContext(CartContext);
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
