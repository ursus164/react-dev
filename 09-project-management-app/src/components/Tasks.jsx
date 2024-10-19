import { useRef } from "react";
import NewTask from "./NewTask";

export default function Tasks({ handleTaskAdd, handleTaskDelete, tasks }) {
  let content = (
    <p className="text-stone-800 my-4">
      This project does not have any tasks yet.
    </p>
  );

  let cssClasses = "rounded-md text-stone-800 hover:text-stone-950 px-3 m-1";

  if (tasks.length > 0) {
    content = (
      <ul className="my-8">
        {tasks.map((task) => {
          return (
            <li key={task.id} className="my-4">
              <div className="flex content-center justify-between">
                <span className="">{"\u2022" + " " + task.text}</span>

                <button
                  onClick={() => handleTaskDelete(task.id)}
                  className={cssClasses + " hover:text-red-400"}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <section className="">
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask saveTask={handleTaskAdd} />
      {content}
    </section>
  );
}
