import Button from "./Button";

export default function ProjectsSidebar({ onStartAddProject, projects, onProjectSelect }) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200 text-center">
        Your Projects
      </h2>
      <div className="text-center">
        {/* centering a button in div */}
        <Button label="+ Add Project" onClick={onStartAddProject} />
      </div>
      <ul className="flex flex-col justify-center mt-8">
        {projects.map((project) => {
          return (
            <li key={project.id}>
              <button onClick={() => onProjectSelect(project.id)} className=" text-stone-400 px-4 py-2 hover:bg-stone-800 hover:cursor-pointer hover:text-stone-200 w-full text-center bg-stone-900 rounded-sm m-2 ">
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
      {/* <ul>
                {List of projects}
            </ul> */}
    </aside>
  );
}
