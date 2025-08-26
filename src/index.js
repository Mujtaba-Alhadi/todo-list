import "./style.css";
import controller from "./controller.js";

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


const myProject = controller.createProject("myProject");
const task1 = controller.createTodo("Task 1", "Description 1", "2025-09-01", "High");
const task2 = controller.createTodo("Task 2", "Description 2", "2025-09-05", "Low");
myProject.addTask(task1);
myProject.addTask(task2);
myProject.removeTask(task1);
console.log(controller.getProjectArr());