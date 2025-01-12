export function getStoredProjects() {
  return [
    {
      title: 'Learning React',
      dueDate: 'Dec 29, 2024',
      description: 'Learn React from the ground up.\n\nStart with the basics, finish with advanced knowledge.',
      tasks: ['Learn advanced concepts', 'Learn the basics', 'Practice, practice, practice'],
    },
    {
      title: 'Mastering React',
      dueDate: 'Aug 3, 2025',
      description: 'Explore more advanced concepts after finishing the first couple of course sections.',
      tasks: ['Learn advanced concepts'],
    },
  ];
}

export function deleteProject(projects, index) {
  const newProjects = structuredClone(projects);
  newProjects.splice(index, 1);
  return newProjects;
}

export function addTask(projects, index, task) {
  const newProjects = structuredClone(projects);
  newProjects[index].tasks.push(task);
  return newProjects;
}

export function deleteTask(projects, index, taskIndex) {
  const newProjects = structuredClone(projects);
  newProjects[index].tasks.splice(taskIndex, 1);
  return newProjects;
}
