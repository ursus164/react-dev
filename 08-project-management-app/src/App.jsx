import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSidebar";
import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined, // property is set to undefined because it will be used to either store ID of the selected project, null - if we want to add new project, or undefined - if we don't want to add new project, or don't want to select any project either
    projects:[] // projects created by user
  })

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,           // spreading previous state in order to not loose data from it - added projects etc...
        selectedProjectId:null, // null - because we are adding some project right now
      }
    })
  }

  let content 
  if(projectsState.selectedProjectId === null) {
    content = <NewProject/>
  } else if(projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  } 

  return (
    // container which keeps all main components and data has a height based on screen width - it is like a container
    <main className="h-screen my-8 flex flex-row gap-8"> 
    {/* after adding flexbox to main elem, it automatically stretches the ProjectSidebar component so that it takes the whole height of the screen */}
      <ProjectsSidebar onStartAddProject={handleStartAddProject}/>
      {content}
    </main>
  );
}

export default App;
