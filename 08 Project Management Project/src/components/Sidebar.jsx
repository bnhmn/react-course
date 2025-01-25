export function Sidebar({ projects, selected, onSelect, onNewProject }) {
  return (
    <menu>
      <h2 className="mb-7 text-xl uppercase text-stone-200 font-bold">Your Projects</h2>
      <button
        className="mb-10 px-3 py-1.5 rounded-md text-md text-stone-400 bg-stone-700 hover:bg-stone-600"
        onClick={() => onNewProject()}
      >
        + Add Project
      </button>
      <ul className="space-y-0">
        {projects.map((project, index) => (
          <li key={index}>
            <button
              className={`w-full p-1.5 text-left text-md text-stone-300 hover:bg-stone-800 ${
                index === selected ? 'bg-stone-800' : ''
              }`}
              onClick={() => onSelect(index)}
            >
              {project.title}
            </button>
          </li>
        ))}
      </ul>
    </menu>
  );
}
