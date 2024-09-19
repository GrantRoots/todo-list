import "./styles.css";

console.log('hi');

class Todo {
    constructor(title, description, dueDate, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.notes = notes;
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
    constructor() {

    }

    todos = []

    addTodo() {

    }
}

//add todo should pop up modal

//show projects and some todos

//function createProject

//NEW TODO BUTTON
const showButton = document.getElementById("showDialog");
const bookDialog = document.getElementById("bookDialog");
const outputBox = document.querySelector("output");

const title = bookDialog.querySelector("#title");
const author = bookDialog.querySelector("#author");
const pages = bookDialog.querySelector("#pages");

const confirmBtn = bookDialog.querySelector("#confirmBtn");

showButton.addEventListener("click", () => {
  bookDialog.showModal();
});

bookDialog.addEventListener("close", (e) => {
  bookDialog.close()
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let newBook = new Book(title.value, author.value, pages.value)
  addBookToLibrary(newBook);
  displayBooks();
  bookDialog.close();
});
