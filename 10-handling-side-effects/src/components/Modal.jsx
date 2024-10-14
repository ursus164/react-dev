import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  // The problem with code below is that when the component is executed for the first time, the dialog ref is not connected to the component yet, because JSX code has not been executed yet - conection has not been established so the ref value is 'undefined'. We have to synchronise values
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  },[open]); // effect function should run whether the component function executed, if one of it's dependencies changed - this is not the case with the empty array. If we don't have any dependencies, they cannot change. Therefore, in the app component, function responsible for getting current user position only executes once.


  return createPortal(
    <dialog className="modal" ref={dialog}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;


//The <dialog> element can also be closed by pressing the ESC key on the keyboard. In that case, the dialog will disappear but the state passed to the open prop (i.e., the modalIsOpen state) will not be set to false.

//Therefore, the modal can't be opened again (because modalIsOpen still is true - the UI basically now is not in sync with the state anymore).

//To fix this issue, we must listen to the modal being closed by adding the built-in onClose prop to the <dialog>. The event is then "forwarded" to the App component by accepting a custom onClose prop on the Modal component.
