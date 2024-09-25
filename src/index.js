import "./styles.css";

class Todo {
  constructor(title, description, dueDate, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.project = project;
  }

  priority() {
    //make modal?
  }

  delete() {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].title === this.project) {
        for (let j = 0; j < projects[i].todos.length; j++) {
          if (projects[i].todos[j].title === this.title) {
            projects[i].todos.splice(j, 1)
            displayProjects()
          }
        }
      }
    }
  }

  expand() {
    // expand to see/ edit details
  }
}

class Project {
  constructor(title) {
    this.title = title;
  }

  todos = []

  addTodo() {

  }

  remove() {

  }
}

const projects = []

//CREATE DEFAULT PROJECT
const defaultProject = new Project('Default')
projects.push(defaultProject)

const main = document.querySelector('.main')

//append each project
function displayProjects() {
  main.textContent = ''
  projects.forEach(project => {
    const projectDiv = document.createElement('div')
    projectDiv.textContent = project.title
    projectDiv.setAttribute('class', 'project')
  
    project.todos.forEach(todo => {
      const todoDiv = document.createElement('div')
      todoDiv.textContent = todo.title
      todoDiv.setAttribute('class', 'todo')

      const dueDateDiv = document.createElement('div')
      dueDateDiv.textContent = todo.dueDate
      todoDiv.appendChild(dueDateDiv)

      const priorityButton = document.createElement('button')
      priorityButton.textContent = 'Priority'
      priorityButton.addEventListener('click', () => {
        todo.priority();
      })
      todoDiv.appendChild(priorityButton)

      const expandButton = document.createElement('button')
      expandButton.textContent = 'Expand'
      expandButton.addEventListener('click', () => {
        todo.expand();
      })
      todoDiv.appendChild(expandButton)

      const deleteButton = document.createElement('button')
      deleteButton.textContent = 'Delete'
      deleteButton.addEventListener('click', () => {
        todo.delete();
      })
      todoDiv.appendChild(deleteButton)

      projectDiv.appendChild(todoDiv)
    })
  
    main.appendChild(projectDiv)
  })
}

displayProjects()

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
    const title = projects[i].title
    const option = document.createElement("option")
    option.textContent = title

    option.value = projects[i].title
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
    if (projects[i].title === selectProject.value) {
      projects[i].todos.push(newTodo)
    }
  }

  //update dom
  displayProjects()

  // create priority, remove, complete, change project buttons

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

  //update dom
  // create remove button
  displayProjects()

  projectDialog.close();
});
