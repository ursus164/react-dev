import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSidebar";
import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected";

function App() {
  const [addProject, setAddProject] = useState(undefined)

  function handleClick() {
    setAddProject((addProject) => !addProject)
  }
  return (
    // container which keeps all main components and data has a height based on screen width - it is like a container
    <main className="h-screen my-8 flex flex-row gap-8"> 
    {/* after adding flexbox to main elem, it automatically stretches the ProjectSidebar component so that it takes the whole height of the screen */}
      <ProjectsSidebar onClick={handleClick}/>
      {addProject ? <NewProject/> : <NoProjectSelected/>}
    </main>
  );
}

export default App;
