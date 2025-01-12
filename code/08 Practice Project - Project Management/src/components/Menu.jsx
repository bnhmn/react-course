export function Menu({ projects, selected, onSelect }) {
  return (
    <aside>
      <h2 className="mb-7 uppercase text-stone-200 font-bold">Your Projects</h2>
      <button className="mb-6 px-3 py-1.5 rounded-md text-xs text-stone-400 bg-stone-700 hover:bg-stone-600">
        + Add Project
      </button>
      <ul className="space-y-0">
        {projects.map((project, index) => (
          <li>
            <button
              className={`w-full p-1.5 text-left text-sm text-stone-300 hover:bg-stone-800 ${
                index === selected ? 'bg-stone-800' : ''
              }`}
              onClick={() => onSelect(index)}
            >
              {project.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
