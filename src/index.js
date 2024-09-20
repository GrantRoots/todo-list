import "./styles.css";

class Todo {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }

  priority() {

  }

  delete() {

  }

  complete() {
    //checks it off
  }

  changeProject() {

  }

  expand() {

  }
}

class Project {
  //stores todos
  constructor(name) {
    this.name = name;
  }

  todos = []

  addTodo() {

  }
}

//show projects and some todos

//NEW TODO BUTTON
const addTodo = document.getElementById("addTodo");
const todoDialog = document.getElementById("todoDialog");
const title = todoDialog.querySelector("#title");
const description = todoDialog.querySelector("#description");
const dueDate = todoDialog.querySelector("#dueDate");
const confirmBtn = todoDialog.querySelector("#confirmBtn");

addTodo.addEventListener("click", () => {
  todoDialog.showModal();
});

todoDialog.addEventListener("close", (e) => {
  todoDialog.close()
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let newTodo = new Todo(title.value, description.value, dueDate.value)
  todoDialog.close();
});

//NEW PROJECT BUTTON
const addProject = document.getElementById("addProject");
const projectDialog = document.getElementById("projectDialog");
const projectTitle = projectDialog.querySelector("#projectTitle");
const projectConfirmBtn = projectDialog.querySelector("#projectConfirmBtn");

addProject.addEventListener("click", () => {
  projectDialog.showModal();
});

projectDialog.addEventListener("close", (e) => {
  projectDialog.close()
});

projectConfirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let newProject = new Project(projectTitle.value)
  todoDialog.close();
});
