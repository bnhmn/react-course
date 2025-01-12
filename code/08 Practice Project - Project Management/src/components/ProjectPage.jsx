export function ProjectPage({ title, dueDate, description, tasks, onDelete, onAddTask, onDeleteTask }) {
  return (
    <>
      <div className="flow-root">
        <h1 className="float-left my-2 text-3xl text-stone-600 font-bold">{title}</h1>
        <button className="float-right mt-5 text-sm hover:text-red-500" onClick={() => onDelete()}>
          Delete
        </button>
      </div>

      <p className="mb-4 text-stone-400">{dueDate}</p>
      <p className="linebreaks">{description}</p>
      <hr className="my-5 bg-stone-200 h-0.5" />
      <h2 className="my-5 text-2xl text-stone-600 font-bold">Tasks</h2>
      <ul className="px-4 py-5 space-y-3 bg-stone-100">
        {tasks.map((task, index) => (
          <li className="flow-root space-x-3">
            <p className="float-left">{task}</p>
            <button className="float-right text-sm hover:text-red-500" onClick={() => onDeleteTask(index)}>
              Clear
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
