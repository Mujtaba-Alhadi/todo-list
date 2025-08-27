class Task {
  constructor(id, title, description, dueDate, priority) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

class Project {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.taskArr = [];
  }

  addTask(task) {
    this.taskArr.push(task);
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

  const createTodo = (title, description, dueDate, priority) => {
    return new Task(crypto.randomUUID(), title, description, dueDate, priority);
  };

  const createProject = (name) => {
    const newProject = new Project(name, crypto.randomUUID());
    projectsArr.push(newProject);
    return newProject;
  };

  const getProjectArr = () => projectsArr;

  return { createTodo, createProject, getProjectArr };
})();

export default todoController;
