import "./style.css";
import todoController from "./todoController.js";
import { format } from "date-fns";
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

const display = function () {
  const projectContainer = document.querySelector(".project-container");
  const taskContainer = document.querySelector(".task-container");
  const projectNameHeader = document.querySelector("h1.project-name");
  const today = format(new Date(), "EEE, MMM d");
  let projectArr = todoController.getProjectArr();

  // default project
  const Home = todoController.createProject("Home");
  Home.addTask("This is a task", today, "Low");
  Home.addTask("This is a medium priority task", today, "Medium");
  Home.addTask("This is a high priority task", today, "High");

  const renderTasks = (project) => {
    taskContainer.textContent = "";
    for (let i = 0; i < project.taskArr.length; i++) {
      // creating elements and appending to the DOM
      const task = document.createElement("div");
      task.className = "task";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "check-task";

      const title = document.createElement("h3");
      title.className = "task-title";
      title.textContent = project.taskArr[i].title;

      const dueDate = document.createElement("p");
      dueDate.className = "due-date";
      dueDate.textContent = project.taskArr[i].dueDate;

      const priority = document.createElement("p");
      priority.className = "priority";
      priority.textContent = project.taskArr[i].priority;

      const editTask = document.createElement("div");
      editTask.className = "edit-task";
      editTask.textContent = "•••";

      const div1 = document.createElement("div");
      const div2 = document.createElement("div");

      div1.appendChild(checkbox);
      div1.appendChild(title);
      div2.appendChild(dueDate);
      div2.appendChild(priority);
      div2.appendChild(editTask);
      task.appendChild(div1);
      task.appendChild(div2);
      taskContainer.appendChild(task);
    }
  };

  const myProject = todoController.createProject("My Project");
  myProject.addTask("1", "2", "3");
  todoController.createProject("YoYo");

  const renderProjects = () => {
    for (let i = 0; i < projectArr.length; i++) {
      // creating elements and appending to the DOM
      const project = document.createElement("div");
      project.className = "project";

      const projectName = document.createElement("div");
      projectName.className = "project-name";
      projectName.textContent = projectArr[i].name;

      project.appendChild(projectName);
      if (projectArr[i].name !== "Home") {
        const editProject = document.createElement("div");
        editProject.className = "edit-project";
        editProject.textContent = "•••";
        project.appendChild(editProject);
      }

      projectContainer.appendChild(project);

      // make Home active
      if (projectArr[i].name === "Home") {
        project.classList.add("active");
        projectNameHeader.textContent = projectArr[i].name;
        renderTasks(Home);
      }

      // Switch active project
      project.addEventListener("click", (e) => {
        const allProjects = document.querySelectorAll(".project");
        allProjects.forEach((project) => project.classList.remove("active"));
        e.currentTarget.classList.add("active");

        projectNameHeader.textContent = projectArr[i].name;
        renderTasks(projectArr[i]);
      });
    }
  };
  renderProjects();
};

display();
