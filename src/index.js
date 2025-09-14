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
  const projectContainer = document.querySelector(".project-container");
  const taskContainer = document.querySelector(".task-container");
  const projectNameHeader = document.querySelector("h1.project-name");

  const defaultRendering = () => {
    const Home = todoController.createProject("Home");
    const today = format(new Date(), "MMM d, yyyy");
    Home.createTask("This is a task", today, "Low");
    Home.createTask("This is a medium priority task", today, "Medium");
    Home.createTask("This is a high priority task", today, "High");

    // make due-date the current day by default
    const dateInput = document.querySelector("input[name='due-date']");
    dateInput.value = format(today, "yyyy-MM-dd");
  };

  const renderTasks = (project) => {
    taskContainer.textContent = "";
    for (let i = 0; i < project.taskArr.length; i++) {
      const task = document.createElement("div");
      task.className = "task";
      task.id = project.taskArr[i].id;

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
      activeProject.createTask(title, format(new Date(dueDate), "MMM d, yyyy"), priority);

      renderTasks(activeProject);
      taskForm.reset();
    // make due-date the current day by default again :)
      document.querySelector("input[name='due-date']").value = format(new Date(), "yyyy-MM-dd");
    });
  };

  const renderProjects = () => {
    projectContainer.textContent = "";

    for (let i = 0; i < projectArr.length; i++) {
      // create elements and append to the DOM
      const project = document.createElement("div");
      project.className = "project";
      project.id = projectArr[i].id;

      const projectName = document.createElement("div");
      projectName.className = "project-name";
      projectName.textContent = projectArr[i].name;

      project.appendChild(projectName);

      // prevent users to edit the Home project
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

  const addProject = () => {
    const projectForm = document.querySelector(".project-form");
    const addProjectBtn = document.querySelector("button.add-project");
    const addProjectName = document.querySelector("input[name='add-project-name']");
    const cancel = document.querySelector("button.cancel");

    // hide the add-project btn, show the project-form and vice versa
    const toggleHidden = () => {
      addProjectBtn.classList.toggle("hidden");
      projectForm.classList.toggle("hidden");
    };
    addProjectBtn.addEventListener("click", () => {
      toggleHidden();
      addProjectName.focus();
    });
    cancel.addEventListener("click", () => toggleHidden());

    // create project and make it active
    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const newProject = todoController.createProject(addProjectName.value);
      renderProjects();
      toggleHidden();

      // make it active
      const newProjectElement = document.getElementById(`${newProject.id}`);
      const allProjects = document.querySelectorAll(".project");
      allProjects.forEach((project) => project.classList.remove("active"));
      newProjectElement.classList.add("active");
      projectNameHeader.textContent = newProject.name;
      renderTasks(newProject);

      projectForm.reset();
    });
  };

  const editProject = () => {
    const popupLayer = document.querySelector(".project-popup-layer");
    const cancel = document.querySelector(".cancel-edit-project");
    const popupForm = document.querySelector(".project-popup-form");
    const popupName = document.querySelector("input[name='popup-project-name']");
    const deleteProject = document.querySelector(".delete-project");
    let currentProject;

    projectContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("edit-project")) {
        popupLayer.classList.remove("hidden");
        const projectId = e.target.parentElement.id;
        currentProject = projectArr.find((p) => p.id === projectId);
        popupName.value = currentProject.name;
        popupName.focus();
      }
    });

    popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      popupLayer.classList.add("hidden");

      currentProject.name = popupName.value;
      document.querySelector(".project.active .project-name").textContent = currentProject.name;
      renderProjects();

      // make it active again instead of Home
      const updatedProjectElement = document.getElementById(`${currentProject.id}`);
      const allProjects = document.querySelectorAll(".project");
      allProjects.forEach((project) => project.classList.remove("active"));
      updatedProjectElement.classList.add("active");
      projectNameHeader.textContent = currentProject.name;
      renderTasks(currentProject);
    });

    cancel.addEventListener("click", () => {
      popupLayer.classList.add("hidden");
    });

    deleteProject.addEventListener("click", () => {
      const projectIndex = projectArr.indexOf(currentProject);
      projectArr.splice(projectIndex, 1);
      popupLayer.classList.add("hidden");
      renderProjects();
    });
  };

  const editTask = () => {
    const popupLayer = document.querySelector(".task-popup-layer");
    const cancel = document.querySelector(".cancel-edit-task");
    const popupForm = document.querySelector(".task-popup-form");
    const popupName = document.querySelector("input[name='popup-task-name']");
    const popupPriority = document.querySelector("select[name='popup-priority']");
    const popupDueDate = document.querySelector("input[name='popup-due-date']");
    const deleteTask = document.querySelector(".delete-task");
    let currentTask, activeProjectId, activeProject;
    
    taskContainer.addEventListener("click", (e) => {
      // find the active project
      activeProjectId = document.querySelector(".project.active").id;
      activeProject = projectArr.find((project) => project.id === activeProjectId);
      
      if (e.target.classList.contains("edit-task")) {
        popupLayer.classList.remove("hidden");
        const taskId = e.target.parentElement.parentElement.id;
        currentTask = activeProject.taskArr.find((task) => task.id === taskId);
        popupName.value = currentTask.title;
        popupPriority.value = currentTask.priority;
        const taskDate = new Date(currentTask.dueDate);
        popupDueDate.value = format(taskDate, "yyyy-MM-dd");
        popupName.focus();
      }
    });

    popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      popupLayer.classList.add("hidden");

      currentTask.title = popupName.value;
      currentTask.priority = popupPriority.value;
      currentTask.dueDate = format(new Date(popupDueDate.value), "MMM d, yyyy");

      renderTasks(activeProject);
    });

    cancel.addEventListener("click", () => {
      popupLayer.classList.add("hidden");
    });

    deleteTask.addEventListener("click", () => {
      activeProject.removeTask(currentTask);
      renderTasks(activeProject);
      popupLayer.classList.add("hidden");
    })
  };

  defaultRendering();
  renderProjects();
  addProject();
  addTask();
  editProject();
  editTask();
};

display();
