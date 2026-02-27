async function fetchBooks() {
    try {
        const response = await axios.get('http://158.160.203.172:8080/book');
        console.log(response.data); 
    } catch (error) {
        console.error('Ошибка при получении книг:', error);
    }
}

function addBook(books) {

}

fetchBooks();