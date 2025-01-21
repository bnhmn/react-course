import { useState } from 'react';

export function ProjectPage({ title, dueDate, description, tasks, onDelete, onAddTask, onDeleteTask }) {
  return (
    <>
      <ProjectDescription title={title} dueDate={dueDate} description={description} onDelete={onDelete} />
      <hr className="my-5 bg-stone-200 h-0.5" />
      <ProjectTasks tasks={tasks} onAddTask={onAddTask} onDeleteTask={onDeleteTask} />
    </>
  );
}

function ProjectDescription({ title, dueDate, description, onDelete }) {
  return (
    <div id="project-description">
      <div className="flex justify-between">
        <h1 className="my-2 text-3xl text-stone-600 font-bold">{title}</h1>
        <button className="text-sm hover:text-red-500" onClick={() => onDelete()}>
          Delete
        </button>
      </div>
      <p className="mb-4 text-stone-400">{dueDate}</p>
      <p className="whitespace-pre-line">{description}</p>
    </div>
  );
}

function ProjectTasks({ tasks, onAddTask, onDeleteTask }) {
  return (
    <div>
      <h2 className="my-5 text-2xl text-stone-600 font-bold">Tasks</h2>
      <TaskInput onAddTask={onAddTask} />
      <TaskList tasks={tasks} onDeleteTask={onDeleteTask} />
    </div>
  );
}

function TaskInput({ onAddTask }) {
  const [newTask, setNewTask] = useState('');
  const handleSubmit = () => {
    if (newTask) {
      onAddTask(newTask);
      setNewTask('');
    }
  };
  return (
    <div className="flex mb-5 gap-4">
      <input
        className="px-2 py-1 w-60 bg-stone-100"
        type="text"
        placeholder="Please enter a task..."
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
        onKeyUp={(event) => event.key === 'Enter' && handleSubmit()}
      />
      <button className="text-sm hover:text-amber-600" onClick={handleSubmit}>
        Add Task
      </button>
    </div>
  );
}

function TaskList({ tasks, onDeleteTask }) {
  return (
    <ul className="px-4 py-5 space-y-3 bg-stone-100">
      {tasks.map((task, index) => (
        <li key={index} className="flex justify-between space-x-3">
          <p>{task}</p>
          <button className="text-sm hover:text-red-500" onClick={() => onDeleteTask(index)}>
            Clear
          </button>
        </li>
      ))}
    </ul>
  );
}
