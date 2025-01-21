import projectsImage from '../assets/no-projects.png';

export function LandingPage({ onNewProject }) {
  return (
    <div className="flex flex-col items-center space-y-7">
      <img src={projectsImage} alt="A pen and a brown writing board" className="w-20" />
      <h2 className="text-2xl text-stone-600 font-bold">No Project Selected</h2>
      <p className="text-lg text-stone-500">Select a project or get started with a new one</p>
      <button
        className="px-3 py-2 rounded-lg text-stone-400 bg-stone-700 hover:text-stone-200 hover:bg-stone-500"
        onClick={() => onNewProject()}
      >
        Create New Project
      </button>
    </div>
  );
}
