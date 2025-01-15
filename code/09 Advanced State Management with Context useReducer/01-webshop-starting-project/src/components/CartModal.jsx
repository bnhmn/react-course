import { useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Cart } from './Cart';

export function CartModal({ ref, cartItems, onChangeItemQuantity, title, actions }) {
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
      <Cart items={cartItems} onChangeItemQuantity={onChangeItemQuantity} />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal'),
  );
}
