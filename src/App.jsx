import { useState } from 'react';
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectSideBar from "./components/ProjectSideBar.jsx";
import SelectedProject from './components/SelectedProject.jsx';

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleSelectedProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleCancelProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    });
  }

  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const newProject ={
        ...projectData,
        id: Math.random()
      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    });
  }

  function handleAddTask(text) {
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask ={
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      }
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <SelectedProject 
                  project={selectedProject} 
                  onDelete={handleDeleteProject} 
                  onAddTask={handleAddTask}
                  onDeleteTask={handleDeleteTask}
                  tasks={projectsState.tasks}/>; 

  if(projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelProject}/>;
  } else if(projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected  onStartAddProject={handleStartAddProject}/>;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSideBar 
      onStartAddProject={handleStartAddProject} 
      projects={projectsState.projects}
      onSelectProject={handleSelectedProject}
      selectedProjectId={projectsState.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
