class Task {
  constructor(title, dueDate, priority, id) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = id;
  }
}

class Project {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.taskArr = [];
  }

  createTask(title, dueDate, priority) {
    const newTask = new Task(title, dueDate, priority, crypto.randomUUID());
    this.taskArr.push(newTask);
    return newTask;
  }

  removeTask(task) {
    const index = this.taskArr.findIndex((todo) => todo.id === task.id);
    if (index !== -1) {
      this.taskArr.splice(index, 1);
    }
  }
}

const todoController = (function () {
  let projectsArr = [];

  const createProject = (name) => {
    const newProject = new Project(name, crypto.randomUUID());
    projectsArr.push(newProject);
    return newProject;
  };

  const getProjectArr = () => projectsArr;

  return { createProject, getProjectArr };
})();

export default todoController;
