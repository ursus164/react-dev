import { useState } from "react"

export default function NewTask({saveTask}) {
    const [enteredTask, setEnteredTask] = useState('');

    function handleChange(event) {
        setEnteredTask(event.target.value)
    }

    function handleClick() {
        setEnteredTask('');
        saveTask(enteredTask)
    }
    return(
        <div className="flex content-center gap-4">
            <input onChange={handleChange} value={enteredTask} type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200"/>
            <button onClick={handleClick} className="text-stone-700 hover:text-stone-950">Add Task</button>
        </div>
    )
}

