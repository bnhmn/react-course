import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ProjectForm } from './components/ProjectForm';
import { ProjectPage } from './components/ProjectPage';
import { Sidebar } from './components/Sidebar';
import { addProject, addTask, deleteProject, deleteTask, getData, selectProject } from './lib/data';

export default function App() {
  const [data, setData] = useState(getData());
  const { projects, selected } = data;

  const handleSelectProject = (index) => setData(selectProject(data, index));
  const handleNewProject = () => setData(selectProject(data, -2));
  const handleCancelProject = () => setData(selectProject(data, -1));
  const handleSubmitProject = (project) => setData(addProject(data, project));
  const handleDeleteProject = () => setData(deleteProject(data, selected));
  const handleAddTask = (task) => setData(addTask(data, selected, task));
  const handleDeleteTask = (taskIndex) => setData(deleteTask(data, selected, taskIndex));

  return (
    <div className="flex">
      <aside className="h-[calc(100vh-2rem)] mt-8 w-1/2 sm:w-72 px-8 py-16 bg-stone-900 text-stone-50 rounded-r-xl">
        <Sidebar
          projects={projects}
          selected={selected}
          onSelect={(index) => handleSelectProject(index)}
          onNewProject={handleNewProject}
        />
      </aside>
      <main className="w-2/3 mx-8 my-20">
        {selected === -1 && <LandingPage onNewProject={handleNewProject} />}
        {selected === -2 && <ProjectForm onSubmit={handleSubmitProject} onCancel={handleCancelProject} />}
        {selected in projects && (
          <ProjectPage
            {...projects[selected]}
            onDelete={handleDeleteProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </main>
    </div>
  );
}
