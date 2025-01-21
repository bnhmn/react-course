import { useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { formatPrice, useShoppingCartStore } from '../store/shoppingCart';

export function CartModal({ ref, title, actions }) {
  // With the useCartStore hook we can access the shared state value.
  // https://github.com/pmndrs/zustand?tab=readme-ov-file#fetching-everything

  const cart = useShoppingCartStore();

  // If we only need a few values of the state, like the items field, we should use this instead:
  // const items = useCartStore(state => state.items)
  // This will rerender the component only when the items field changes.
  // https://github.com/pmndrs/zustand?tab=readme-ov-file#selecting-multiple-state-slices

  const dialog = useRef();

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
          Cart Total: <strong>{formatPrice(cart.getTotalPrice())}</strong>
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
