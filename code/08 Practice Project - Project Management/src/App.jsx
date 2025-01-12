import { useState } from 'react';
import { Menu } from './components/Menu';
import { ProjectPage } from './components/ProjectPage';
import { addTask, deleteProject, deleteTask, getStoredProjects } from './lib/projects';

export default function App() {
  const [projects, setProjects] = useState(getStoredProjects());
  const [selected, setSelected] = useState(0);
  const selectedProject = projects[selected];

  const handleDelete = () => setProjects(deleteProject(projects, selected));
  const handleAddTask = (task) => setProjects(addTask(projects, selected, task));
  const handleDeleteTask = (taskIndex) => setProjects(deleteTask(projects, selected, taskIndex));

  return (
    <div className="flex">
      <menu className="h-screen w-1/2 sm:w-72 mt-8 px-8 py-16 bg-stone-900 text-stone-50 rounded-r-xl">
        <Menu projects={projects} selected={selected} onSelect={(index) => setSelected(index)} />
      </menu>
      <main className="h-screen w-2/3 mx-8 my-20">
        {selectedProject && (
          <ProjectPage
            {...selectedProject}
            onDelete={handleDelete}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </main>
    </div>
  );
}
