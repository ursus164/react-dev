import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = '' }) {
    const dialog = useRef();
    useEffect(() => {
        const modal = dialog.current; // locking value of dialog ref in case it changes and we will not be able to run cleanup function on that particular element (loose focus on that) -> recommended pattern
        if(open) {
            modal.showModal();
        }
        return () => modal.close(); // cleanup function that runs when dependency (from use effect) changes
    },[open]);
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>{children}</dialog>,
    document.getElementById("modal")
  );
}
