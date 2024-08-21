import Button from "./Button";

export default function ProjectsSidebar({onStartAddProject}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200 text-center">
        Your Projects
      </h2>
      <div className="text-center">
        {/* centering a button in div */}
        <Button label='+ Add Project' onClick={onStartAddProject}/>
      </div>
      {/* <ul>
                {List of projects}
            </ul> */}
    </aside>
  );
}
