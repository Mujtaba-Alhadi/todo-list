import "./style.css";
import todoController from "./todoController.js";

// todo class
// projects = separate list of todos
// default project, users can create new projects
// separate the logic from the DOM (new todos, setting todos as complete, changing priority)
// the ui should be able to:
//    view all projects
//    view all todos in each project (without the description)
//    expand a todo to see/edit it
//    delete a todo
// for formatting and manipulating dates use date-fns library
// function that uses localStorage to save data
// function that looks for that data in localStorage when the app is loaded
// make sure it doesn't crash if the data is not there
// figure out how to add methods back to your object properties once you fetch them

console.log(todoController.getProjectArr());
const display = function () {
  const projectList = document.querySelector(".project-list");
  let projectArr = todoController.getProjectArr();
  const taskList = document.querySelector(".task-list");

  const renderTasks = () => {};

  const defaultProject = () => {
    const Home = todoController.createProject("Home");
    Home.addTask("This is a task", new Date(), "low");
    Home.addTask("This is a medium priority task", new Date(), "medium");
    Home.addTask("This is a high priority task", new Date(), "high");
  };
  defaultProject();
  
  todoController.createProject("My Project");
  todoController.createProject("YoYo");
  
  const renderProjects = () => {
    for (let i = 0; i < projectArr.length; i++) {
      const project = document.createElement("div");
      const projectName = document.createElement("div");
      const editProject = document.createElement("div");
      project.className = "project";
      projectName.className = "project-name";
      editProject.className = "edit-project";

      projectName.textContent = projectArr[i].name;
      if (projectName.textContent !== "Home") {
        editProject.textContent = "•••";
      }

      project.appendChild(projectName);
      project.appendChild(editProject);
      projectList.appendChild(project);

      // Switch active project
      project.addEventListener("click", (e) => {
        const allProjects = document.querySelectorAll(".project");
        allProjects.forEach((project) => project.classList.remove("active"));
        e.currentTarget.classList.add("active");
      });
    }
  };
  renderProjects();
};

display();
