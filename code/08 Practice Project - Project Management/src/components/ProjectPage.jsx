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
      <div className="flow-root">
        <h1 className="float-left my-2 text-3xl text-stone-600 font-bold">{title}</h1>
        <button className="float-right mt-5 text-sm hover:text-red-500" onClick={() => onDelete()}>
          Delete
        </button>
      </div>
      <p className="mb-4 text-stone-400">{dueDate}</p>
      <p className="linebreaks">{description}</p>
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
  return (
    <div className="mb-5 space-x-4">
      <input
        type="text"
        placeholder="Please enter a task..."
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
        className="px-2 py-1 w-60 bg-stone-100"
      />
      <button
        className="text-sm hover:text-amber-600"
        onClick={() => {
          if (newTask) {
            onAddTask(newTask);
            setNewTask('');
          }
        }}
      >
        Add Task
      </button>
    </div>
  );
}

function TaskList({ tasks, onDeleteTask }) {
  return (
    <ul className="px-4 py-5 space-y-3 bg-stone-100">
      {tasks.map((task, index) => (
        <li key={index} className="flow-root space-x-3">
          <p className="float-left">{task}</p>
          <button className="float-right text-sm hover:text-red-500" onClick={() => onDeleteTask(index)}>
            Clear
          </button>
        </li>
      ))}
    </ul>
  );
}
