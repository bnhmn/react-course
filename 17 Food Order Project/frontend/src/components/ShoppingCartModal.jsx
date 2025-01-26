import { useEffect, useRef } from 'react';

export function ShoppingCartModal({ cart, open, onClose }) {
  const dialog = useRef();
  const hasItems = cart.items.length >= 1;

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return (
    <dialog ref={dialog} className="modal" onClose={onClose}>
      <h2>Your Cart</h2>
      {!hasItems && <p>Your cart is empty!</p>}
      {hasItems && (
        <div>
          {cart.items.map((item) => (
            <li key={item.id} className="cart-item">
              <p>
                {item.name} - ${item.price}
              </p>
              <div className="cart-item-actions">
                <button onClick={() => cart.decreaseAmount(item.id)}>-</button>
                <span>{item.amount}</span>
                <button onClick={() => cart.increaseAmount(item.id)}>+</button>
              </div>
            </li>
          ))}
        </div>
      )}
      <p className="cart-total">
        <strong>${cart.totalPrice}</strong>
      </p>
      <div className="modal-actions">
        <button className="text-button" onClick={onClose}>
          Close
        </button>
        <button className="button" onClick={() => null} disabled={!hasItems}>
          Go to Checkout
        </button>
      </div>
    </dialog>
  );
}
