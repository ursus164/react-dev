import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSidebar";
import { useState, useRef } from "react";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined, // property is set to undefined because it will be used to either store ID of the selected project, null - if we want to add new project, or undefined - if we don't want to add new project, or don't want to select any project either
    projects: [], // projects created by user
    tasks: [],
  });

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState, // spreading previous state in order to not loose data from it - added projects etc...
        selectedProjectId: null, // null - because we are adding some project right now
      };
    });
  }

  function handleAddProject(projectData) {
    // finish adding project process, it should be executed in the component in which the data is collected
    setProjectsState((prevState) => {
      // const projectData = {
      //   title: '',
      //   descr: '',
      //   dueDate: ''
      // }
      const newProject = { ...projectData, id: Math.random() };

      return {
        // new object
        ...prevState,
        selectedProjectId: undefined, // existing data is copied to the new obj
        projects: [...prevState.projects, newProject], //new project is added after copying the previous values from projects array
      };
    });
  }

  function handleCancelProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
<<<<<<< HEAD
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projects: [
          ...prevState.projects.filter(
            (project) => project.id !== projectsState.selectedProjectId
          ),
        ],
        selectedProjectId: undefined,
      };
    });
=======
>>>>>>> 04164dcbf52934cb80686b5776377dd8810391ca
  }

  function handleProjectSelect(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState, // spreading previous state in order to not loose data from it - added projects etc...
        selectedProjectId: id, // null - because we are adding some project right now
      };
    });
<<<<<<< HEAD
  }

  // console.log(projectsState)
  // console.log(projectsState.selectedProjectId);
=======
  }

  function handleProjectDelete() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [
          ...prevState.projects.filter(
            (project) => project.id !== projectsState.selectedProjectId
          ),
        ],
      };
    });
  }

  function handleAddTask(task) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        id: taskId,
        projectId: prevState.selectedProjectId,
        text: task,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: [prevState.tasks.filter((task) => task.taskId !== id)],
      };
    });
  }

  // console.log(projectsState)
  // console.log(projectsState.projects);
>>>>>>> 04164dcbf52934cb80686b5776377dd8810391ca

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

<<<<<<< HEAD
  let content = <ProjectDetails project={selectedProject} onDeleteProject={handleDeleteProject} />;
=======
  let content = (
    <ProjectDetails
      project={selectedProject}
      onProjectDelete={handleProjectDelete}
      addTask={handleAddTask}
      deleteTask={handleDeleteTask}
      projectTasks={projectsState.tasks}
    />
  );
>>>>>>> 04164dcbf52934cb80686b5776377dd8810391ca
  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onProjectAdd={handleAddProject}
        onCancel={handleCancelProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    // container which keeps all main components and data has a height based on screen width - it is like a container
    <main className="h-screen my-8 flex flex-row gap-8">
      {/* after adding flexbox to main elem, it automatically stretches the ProjectSidebar component so that it takes the whole height of the screen */}
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onProjectSelect={handleProjectSelect}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
