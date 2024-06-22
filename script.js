const bookList = document.getElementById('bookList');
const newBookBtn = document.getElementById('newBook');
const dialog = document.getElementById('dialog');
const submitForm = document.querySelector('#form');
const cancelBtn = document.getElementById('cancelBtn');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
})

cancelBtn.addEventListener("click", () => {
    clearInput();
})

submitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
})

const myLibrary = [];
let lastIndex = 0;

function Book(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index

    this.hasRead = function() {
        let hasRead = "";
        if (this.read)
            hasRead = "Read";
        else
            hasRead = "Not read";
        return hasRead;
    };
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read, lastIndex++);
    myLibrary.push(book);
    let div = document.createElement('div');
    div.setAttribute('id', book.index);
    div.setAttribute('class', 'books');
    let titleText = document.createElement('p');
    let authorText = document.createElement('p');
    let pagesText = document.createElement('p');
    let readText = document.createElement('p');
    titleText.innerHTML = "Title: " + book.title;
    authorText.innerHTML = "Author: " + book.author;
    pagesText.innerHTML = book.pages + " Pages";
    readText.innerHTML = book.hasRead();
    div.appendChild(titleText);
    div.appendChild(authorText);
    div.appendChild(pagesText);
    div.appendChild(readText);
    bookList.append(div);
    let btnDiv = document.createElement('div');
    btnDiv.setAttribute('id', 'bookBtn');
    div.appendChild(btnDiv);
    let readBtn = document.createElement('button');
    readBtn.setAttribute('id', 'readBtn');
    readBtn.innerHTML = 'Has Read?';
    btnDiv.appendChild(readBtn);
    readBtn.addEventListener("click", () => {
        book.read = !book.read;
        readText.innerHTML = book.hasRead();
    })
    let removeBtn = document.createElement('button');
    removeBtn.setAttribute('id', 'removeBtn');
    removeBtn.innerHTML = 'Remove Book';
    btnDiv.appendChild(removeBtn);
    removeBtn.addEventListener("click", () => {
        document.getElementById(btnDiv.parentNode.id).remove();
        myLibrary.splice(btnDiv.parentNode.id, btnDiv.parentNode.id);
    })
    clearInput();
}

function clearInput() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
    dialog.close();
}

window.onload = function () {
    addBookToLibrary("The Fellowship of the Ring", "J.R.R Tolkien", "423", true);
    addBookToLibrary("Breaking Dawn", "Stephenie Meyer", "700", true);
    addBookToLibrary("Harry Potter and the Goblet of Fire", "J.K. Rowling", "636", false);
}