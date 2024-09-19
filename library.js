const myLibrary = [];

function Book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(bookIndex) {
    myLibrary.splice(bookIndex, 1);
    renderBooks();
}

hp = new Book("Harry Potter", "J.K. Rowling", true);
lotr = new Book("Lord of the Rings", "J.R.R Tolkien", true);
botns = new Book("Book of the New Sun", "Gene Wolfe", true);

addBookToLibrary(hp);
addBookToLibrary(lotr);
addBookToLibrary(botns);

console.log(myLibrary);

document.addEventListener("DOMContentLoaded", () => {
    renderBooks();
    document.querySelector(".add-book").addEventListener("click", toggleBookForm);
    document.querySelector("#cancel-book-form").addEventListener("click", toggleBookForm);
    document.querySelector("#submit-book").addEventListener('click', submitNewBook);
});

function renderBooks() {
    const booksDiv = document.querySelector(".books-list");
    booksDiv.innerHTML = "";  // Clear previous content
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add("book-card");
        let readText = "Read";
        if (book.read != true) { readText = "Unread"; }
        bookCard.innerHTML = `
            <p>Title: ${book.title}</p>
            <p>Author: ${book.author}</p>
            <div class="card-buttons">
                <button class="book-read" onclick="toggleReadByIndex(${index})">${readText}</button>
                <button class="remove-book" onclick="removeBookFromLibrary(${index})">Remove Book</button>
            </div>
        `;
        booksDiv.appendChild(bookCard);
    });
}

function toggleReadByIndex(index) {
    myLibrary[index].read = !myLibrary[index].read;
    renderBooks();
}

function toggleBookForm() {
    console.log("toggle book form");
    const form = document.querySelector(".book-form");
    const addBook = document.querySelector(".add-book");

    if (form.style.display === "none" || form.style.display === "") {
        form.style.display = "flex";
        //addBook.setAttribute("disabled", "true");
    } else {
        form.style.display = "none";
        //addBook.removeAttribute("disabled");
    }
}

function submitNewBook(event) {
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;  
    const read = document.getElementById("book-completed").checked;
    console.log("Title:", title);
    console.log("Author:", author);
    console.log("Read:", read);

    if (title!="" && author!="") {
        const book = new Book(title, author, read);
        addBookToLibrary(book);
        console.log(myLibrary);
        renderBooks();
        formError("");

        document.getElementById("book-title").value = "";
        document.getElementById("book-author").value = "";
        document.getElementById("book-completed").checked = false;

        toggleBookForm();
    }
    else {
        formError("Title and author fields cannot be blank.")
    }
    event.preventDefault();
}

function formError(message) {
    const errorMessage = document.querySelector(".error-message");
    errorMessage.innerHTML = message;
}