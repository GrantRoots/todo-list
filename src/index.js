import "./styles.css";

class Todo {
  constructor(title, description, dueDate, project) {
    this.title = title;
    this.description = description;

    //use date fns? on odin project page
    this.dueDate = dueDate;
    this.project = project;
  }

  // delete() {
  //   for (let i = 0; i < projects.length; i++) {
  //     if (projects[i].title === this.project) {
  //       for (let j = 0; j < projects[i].todos.length; j++) {
  //         if (projects[i].todos[j].title === this.title) {
  //           projects[i].todos.splice(j, 1)
  //           displayProjects()
  //         }
  //       }
  //     }
  //   }
  // }

  edit() {
    const newTitle = prompt('Edit Title(Cancel to skip):')
    if (newTitle !== null){
      this.title = newTitle
    }
    const newDueDate = prompt('Edit Due Date(Cancel to skip):')
    if (newDueDate !== null){
      this.dueDate = newDueDate
    }
    const newDescription = prompt('Edit Description(Cancel to skip):')
    if (newDescription !== null){
      this.description = newDescription
    }
    displayProjects()
  }

  priority() {
    //store priority for localstorage
  }
}

class Project {
  constructor(title) {
    this.title = title;
  }

  todos = []

  // delete() {
  //   for (let i = 0; i < projects.length; i++) {
  //     if (projects[i].title === this.title) {
  //       projects.splice(i, 1)
  //       displayProjects()
  //     }
  //   }
  // }
}

let projects = []

//CREATE DEFAULT PROJECT
const defaultProject = new Project('Default Project')
projects.push(defaultProject)

const main = document.querySelector('.main')

//append each project
function displayProjects() {
  main.textContent = ''
  projects.forEach(project => {
    const projectDiv = document.createElement('div')
    projectDiv.textContent = project.title
    projectDiv.setAttribute('class', 'project')

    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete Project'
    deleteButton.addEventListener('click', () => {
      // project.delete();

      for (let i = 0; i < projects.length; i++) {
        if (projects[i].title === project.title) {
          projects.splice(i, 1)
          displayProjects()
        }
      }
    })
    deleteButton.setAttribute('class', 'deleteButton')
    projectDiv.appendChild(deleteButton)
  
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
        const styles = window.getComputedStyle(todoDiv)
        let color = styles.getPropertyValue('background-color')
        if (color === 'rgb(189, 189, 189)') {
          todoDiv.style.backgroundColor = 'rgb(0, 128, 0)'
          return
        }
        if (color === 'rgb(0, 128, 0)') {
          todoDiv.style.backgroundColor = 'rgb(255, 255, 0)'
          return
        }
        if (color === 'rgb(255, 255, 0)') {
          todoDiv.style.backgroundColor = 'rgb(255, 0, 0)'
          return
        }
        if (color === 'rgb(255, 0, 0)') {
          todoDiv.style.backgroundColor = 'rgb(189, 189, 189)'
          return
        }
      })
      todoDiv.appendChild(priorityButton)

      const expandButton = document.createElement('button')
      expandButton.textContent = 'Expand'
      expandButton.addEventListener('click', () => {
        //make sure it doesnt put things on the screen twice
        const descriptionDiv = document.createElement('div')
        descriptionDiv.textContent = 'Description: '
        descriptionDiv.innerHTML += todo.description
        dueDateDiv.appendChild(descriptionDiv)

        //add edit button
        const editButton = document.createElement('button')
        editButton.textContent = 'Edit'
        editButton.addEventListener('click', () => {
          //todo.edit()

          const newTitle = prompt('Edit Title(Cancel to skip):')
          if (newTitle !== null){
            todo.title = newTitle
          }
          const newDueDate = prompt('Edit Due Date(Cancel to skip):')
          if (newDueDate !== null){
            todo.dueDate = newDueDate
          }
          const newDescription = prompt('Edit Description(Cancel to skip):')
          if (newDescription !== null){
            todo.description = newDescription
          }
          displayProjects()
        })
        descriptionDiv.appendChild(editButton)
      })
      todoDiv.appendChild(expandButton)

      const deleteButton = document.createElement('button')
      deleteButton.textContent = 'Delete'
      deleteButton.addEventListener('click', () => {
        // todo.delete()

        for (let i = 0; i < projects.length; i++) {
          if (projects[i].title === todo.project) {
            for (let j = 0; j < projects[i].todos.length; j++) {
              if (projects[i].todos[j].title === todo.title) {
                 projects[i].todos.splice(j, 1)
                displayProjects()
              }
            }
          }
        }
      })
      todoDiv.appendChild(deleteButton)

      projectDiv.appendChild(todoDiv)
    })
  
    main.appendChild(projectDiv)

    console.log(projects)
    //set storage every change
    localStorage.setItem("projects", JSON.stringify(projects));
  })
}

//localStorage.clear()

//first get storage
const jsonProjects = JSON.parse(localStorage.getItem("projects"));
if (jsonProjects !== null) {
  projects = jsonProjects
}

displayProjects()

//ADD TODO BUTTON
const addTodo = document.getElementById("addTodo");
const todoDialog = document.getElementById("todoDialog");
const title = todoDialog.querySelector("#title");
const description = todoDialog.querySelector("#description");
const dueDate = todoDialog.querySelector("#dueDate");
const confirmBtn = todoDialog.querySelector("#confirmBtn");

const selectProject = todoDialog.querySelector("#selectProject");

addTodo.addEventListener("click", () => {
  selectProject.innerHTML = ''
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