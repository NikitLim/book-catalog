async function fetchBooks() {
    try {
        const response = await axios.get('http://158.160.203.172:8080/book');
        console.log(response.data); 
        const books = response.data;
        addBook(books);
    } catch (error) {
        console.error('Ошибка при получении книг:', error);
    }
}

function addBook(books) {
    const bookList = document.querySelector('#books');
    books.forEach(book => {
        const imageUrl = book.image 
                ? `http://158.160.203.172:8080/image/${book.image}` 
                : 'img/no-image.jpg';
        const bookCard = `
        <a href="book.html?id=${book.id}" class="book-link">
            <div class="book-card">
                <img src="${imageUrl}" alt="${book.name}">
                <h2>${book.name}</h2>
            </div>
        </a>
        `
        bookList.innerHTML += bookCard;
    });
}

const searchInput = document.querySelector('.header-search');
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});


fetchBooks();