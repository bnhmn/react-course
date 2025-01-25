import { useContext, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CartContext, computeTotalPrice, formatPrice } from '../store/cart-context';

export function CartModal({ ref, title, actions }) {
  // With the useContext hook we can access the shared context value.
  const cart = useContext(CartContext);
  const dialog = useRef();
  const totalPrice = computeTotalPrice(cart);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <div id="cart">
        {cart.items.length === 0 && <p>No items in cart!</p>}
        {cart.items.length > 0 && (
          <ul id="cart-items">
            {cart.items.map((item) => (
              <CartItem key={item.id} {...item} onChangeItemQuantity={cart.changeItemQuantity} />
            ))}
          </ul>
        )}
        <p id="cart-total-price">
          Cart Total: <strong>{formatPrice(totalPrice)}</strong>
        </p>
      </div>
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal'),
  );
}

function CartItem({ id, name, quantity, price, onChangeItemQuantity }) {
  return (
    <li key={id}>
      <div>
        <span>{name}</span>
        <span>({formatPrice(price)})</span>
      </div>
      <div className="cart-item-actions">
        <button onClick={() => onChangeItemQuantity(id, -1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => onChangeItemQuantity(id, 1)}>+</button>
      </div>
    </li>
  );
}
