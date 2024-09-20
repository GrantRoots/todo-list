import "./styles.css";

class Todo {
  constructor(title, description, dueDate, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.project = project;
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
  constructor(name) {
    this.name = name;
  }

  todos = []

  addTodo() {

  }
}

const projects = []

//CREATE DEFAULT PROJECT
const defaultProject = new Project('Default Project')
projects.push(defaultProject)

console.log(projects)

//show projects and 3 todos on main content

//ADD TODO BUTTON
const addTodo = document.getElementById("addTodo");
const todoDialog = document.getElementById("todoDialog");
const title = todoDialog.querySelector("#title");
const description = todoDialog.querySelector("#description");
const dueDate = todoDialog.querySelector("#dueDate");
const confirmBtn = todoDialog.querySelector("#confirmBtn");

const selectProject = todoDialog.querySelector("#selectProject");

addTodo.addEventListener("click", () => {
  for (let i = 0; i < projects.length; i++) {
    const name = projects[i].name
    const option = document.createElement("option")
    option.textContent = name

    option.value = projects[i].name
    console.log(option.value)

    selectProject.appendChild(option)
  }

  todoDialog.showModal();
});

todoDialog.addEventListener("close", (e) => {
  todoDialog.close()
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let newTodo = new Todo(title.value, description.value, dueDate.value, selectProject.value)

  //put todo in projects todo array
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].name === selectProject.value) {
      projects[i].todos.push(newTodo)
    }
  }

  todoDialog.close();
});

//ADD PROJECT BUTTON
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
  projects.push(newProject)
  todoDialog.close();
});
