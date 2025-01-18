import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export function Modal({ children, open = false, onClose }) {
  const dialog = useRef();

  // We can use the useEffect hook to trigger imperative browser code like opening or closing a modal.
  // We can access the dialog ref here because the effect runs after the component was rendered.
  // We need to mark the 'open' prop as a dependency so that React reruns the effect when the prop changes.

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal'),
  );
}
