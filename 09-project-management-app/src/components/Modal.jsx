import ReactDOM from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from "react";
import Button from "./Button";

// Modal component is gonna be as flexible as possible. Therefore  its content {children} is wrapped in <dialog/> elem. However it could become more flexible and re-usable. 
// We have to ensure that we can open the <dialog>...</dialog> element by calling a function that should be exposed by our custom component (Modal), 
// that does not require the calling component - so another component that uses the modal, to know that a <dialog> elem is used internally. That should not be the information that is needed by the component that uses our modal component. 
// This can be achieved by using forwardRef() and useImperativeHandle() hook.

const Modal = forwardRef(function Modal({ children, btnLabel }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    // exposing a function/method that can be called from outside of the component
    return {
      open() {
        // here we want to reach out our <dialog> and call built-in show modal method - we have to have ref to that element (useRef() is needed)
        dialog.current.showModal();
      },
    };
  });
  return ReactDOM.createPortal(
    <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-xl shadow-2xl">
      {children}
      <form method="dialog" className="text-right p-1">
        <Button label={btnLabel}></Button>
      </form>
    </dialog>,
    document.querySelector("#modal-root")
  );
});

export default Modal;
