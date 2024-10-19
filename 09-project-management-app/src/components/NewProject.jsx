import Input from "./Input";
import { useRef } from "react";
import Modal from "./Modal";

export default function NewProject({ onProjectAdd, onCancel }) {
  const modal = useRef();

  const title = useRef();
  const descr = useRef();
  const dueDate = useRef();

  function handleSaveProject() {
    const enteredTitle = title.current.value; // inputs which we are refering to have value property
    const enteredDescr = descr.current.value;
    const enteredDueDate = dueDate.current.value;

    //TODO validation
    if (
      enteredTitle.trim() === "" ||
      enteredDescr.trim() === "" ||
      enteredDueDate.trim() === ""
      // trim gets rid of empty spaces in front and in the end
      //show error modal
    ) {
      modal.current.open()
      return; // rest should not be executed
    }

    // pass data back to the app component which manages projects array
    onProjectAdd({
      title: enteredTitle,
      descr: enteredDescr,
      dueDate: enteredDueDate,
    });
  }
  return (
    <>
      <Modal ref={modal} btnLabel={'Close'}>
        <h2 className="text-xl font-bold text-stone-600 mt-1 mb-4 text-center">Invalid Input</h2>
        <p className="text-stone-500 mb-4 text-center">Oops... look like you forgot to enter a value.</p>
        <p className="text-stone-500 mb-4 text-center">Please make sure to provide valid value for every input field.</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onCancel}
              className="rounded-md text-stone-800 hover:text-stone-950">
              Cancel
            </button>
          </li>
          <li>
            {/* TODO - saving should close a NewProject component and add item to the sidebar */}
            <button
              onClick={handleSaveProject}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
              Save
            </button>
          </li>
        </menu>
        <div>
          {/* data should be collected from inputs. One way is to use onChange event and update state on every keystroke, data that was passed to the inputs. However we only need to read those values after clicking save button, we don't have to manage extra state - the best possible option is to use refs. By them we can connect to html elements and interact with them. For example to retrieve a value from input. Also components below are custom, so we have to forward refs to them */}
          <Input type="text" label="Title" ref={title} />
          <Input label="Description" textarea ref={descr} />
          <Input type="date" label="Due Date" ref={dueDate} />
        </div>
      </div>
    </>
  );
}
