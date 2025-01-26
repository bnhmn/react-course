import { useEffect, useRef, useState } from 'react';
import { CheckoutForm } from './checkout/CheckoutForm';
import { ShoppingCart } from './ShoppingCart';

export function Modal({ cart, open, onClose }) {
  const dialog = useRef();
  const [state, setState] = useState('cart');

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  function handleClose() {
    setState('cart');
    onClose();
  }

  return (
    <dialog ref={dialog} className="modal" onClose={handleClose}>
      {state === 'cart' && <ShoppingCart cart={cart} onClose={handleClose} onContinue={() => setState('checkout')} />}
      {state === 'checkout' && <CheckoutForm cart={cart} onClose={handleClose} />}
    </dialog>
  );
}
