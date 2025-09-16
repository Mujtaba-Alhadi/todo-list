class Task {
  constructor(title, dueDate, priority, id, completed = false) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = id;
    this.completed = completed;
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

  const saveToLocalStorage = () => {
    localStorage.setItem("projectsArr", JSON.stringify(projectsArr));
  };

  const loadFromLocalStorage = () => {
    const data = localStorage.getItem("projectsArr");

    if (data) {
      const parsedData = JSON.parse(data);

      projectsArr = parsedData.map((project) => {
        const restoredProject = new Project(project.name, project.id);

        restoredProject.taskArr = project.taskArr.map((task) => {
          return new Task(task.title, task.dueDate, task.priority, task.id, task.completed);
        });

        return restoredProject;
      });
    }
  };

  return { createProject, getProjectArr, saveToLocalStorage, loadFromLocalStorage };
})();

export default todoController;
