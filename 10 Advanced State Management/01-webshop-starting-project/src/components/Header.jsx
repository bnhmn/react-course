import { useRef } from 'react';
import { CartModal } from './CartModal';

export function Header({ cart, onChangeItemQuantity }) {
  const modal = useRef();
  const numCartItems = cart.items.length;
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
        cartItems={cart.items}
        onChangeItemQuantity={onChangeItemQuantity}
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
