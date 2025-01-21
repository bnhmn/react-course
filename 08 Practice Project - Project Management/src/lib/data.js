export function getData() {
  return {
    projects: [
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
    ],
    selected: 0,
  };
}

export function createProject(title, description, dueDate) {
  return {
    title,
    description,
    dueDate,
    tasks: [],
  };
}

export function addProject(data, project) {
  const newData = structuredClone(data);
  newData.projects.push(project);
  newData.selected = newData.projects.length - 1;
  return newData;
}

export function selectProject(data, newSelected) {
  const newData = structuredClone(data);
  newData.selected = newSelected;
  return newData;
}

export function deleteProject(data, index) {
  const newData = structuredClone(data);
  newData.projects.splice(index, 1);
  if (newData.selected >= newData.projects.length) {
    newData.selected = newData.projects.length - 1;
  }
  return newData;
}

export function addTask(data, index, task) {
  const newData = structuredClone(data);
  newData.projects[index].tasks.push(task);
  return newData;
}

export function deleteTask(data, index, taskIndex) {
  const newData = structuredClone(data);
  newData.projects[index].tasks.splice(taskIndex, 1);
  return newData;
}
