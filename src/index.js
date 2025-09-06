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
  let projectArr = todoController.getProjectArr();

  const defaultProject = () => {
    const Home = todoController.createProject("Home");
    const today = format(new Date(), "EEE, MMM d");
    Home.createTask("This is a task", today, "Low");
    Home.createTask("This is a medium priority task", today, "Medium");
    Home.createTask("This is a high priority task", today, "High");
  };

  const renderTasks = (project) => {
    const taskContainer = document.querySelector(".task-container");
    taskContainer.textContent = "";
    for (let i = 0; i < project.taskArr.length; i++) {
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

  const addTask = () => {
    const taskForm = document.querySelector(".task-form");
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.querySelector("input[name = 'task-name']").value;
      const dueDate = document.querySelector("input[name = 'due-date']").value;
      const priority = document.querySelector("select[name = 'priority']").value;
      // find the active project and insert the task into it
      const activeProjectId = document.querySelector(".project.active").id;
      const activeProject = projectArr.find((project) => project.id === activeProjectId);
      activeProject.createTask(title, format(new Date(dueDate), "EEE, MMM d"), priority);

      renderTasks(activeProject);
      taskForm.reset();
    });
  };

  const renderProjects = () => {
    const projectContainer = document.querySelector(".project-container");
    const projectNameHeader = document.querySelector("h1.project-name");

    for (let i = 0; i < projectArr.length; i++) {
      // create elements and append to the DOM
      const project = document.createElement("div");
      project.className = "project";
      project.id = projectArr[i].id;

      const projectName = document.createElement("div");
      projectName.className = "project-name";
      projectName.textContent = projectArr[i].name;

      project.appendChild(projectName);
      if (projectArr[i].name !== "Home") {
        // prevent users to edit the Home project
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
        renderTasks(projectArr[i]);
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

  defaultProject();
  const myProject = todoController.createProject("My Project");
  const yoyo = todoController.createProject("YoYo");
  renderProjects();
  addTask();
};

display();
