import { useEffect } from "react";

// Component responsible for rendering the content of the modal
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    const timePtr = setTimeout(() => {
      // code that will be executed after the timeout in the second arg
      onConfirm();
    }, 3000); // function built into the browser

    // function that will be executed right before the effect function above runs again, or right before the whole components dismounts (is removed from DOM)
    return () => {
      // cleanup function would also run if the effect function runs again -> it will be executed right before the effect function runs

      // it only runs before subsequent execution of the effect function and when the component is removed
      clearTimeout(timePtr);
    };
  }, []); // onConfirm is a function and when we add functions as dependencies, there is a danger of creating an infinite loop -> when the app component is re executed, the brand new handleRemovePLace() function (object) is created and when that function is recieved in this compoenent, react compares the old value to the new one and determines that they are different. That is because objects (functions with the same code, shape etc...) are not equal in java script. Therefore function will be re executed even though tehcnically dependency did not change

  // We have infinite loop -> When function is executed here, we are updating the state in the app component (setModalIsOpen(...), then the whole component is re-rendered, therefore a brand new handleRemovePlace(...) function is created and passed to DeleteConfirmation(...) and there, the effect function runs again.

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}

// There are some problems with that component. It is always rendered - it is rendered by app component and its wrapped by the modal component which is also always rendered. It's just not always visible in the DOM because internally the modal component controlls the dialogs visibility by open prop responsible for showing or hiding it. So the DeleteConfirmation() component is always part of the DOM and therefore the timer will actually be set and started when the app component is rendered for the first time (and DeleteConfirmation component is also rendering)
