const bookId = new URLSearchParams(window.location.search).get('id');

console.log('Book ID:', bookId);

const bookTitle = document.querySelector('.name');
const bookAuthor = document.querySelector('.author');
const bookGenre = document.querySelector('.genre');
const bookImage = document.querySelector('.image');

async function fetchBookDetails() {
    try {
        const response = await axios.get(`http://158.160.203.172:8080/book?id=${bookId}`);
        console.log('Book details:', response.data);
        const book = response.data;
        const imageUrl = book.image 
                ? `http://158.160.203.172:8080/image/${book.image}` 
                : 'img/no-image.jpg';
        bookImage.src = imageUrl;
        bookTitle.textContent = book.name;
        
        // Отдельная обработка запроса автора
        try {
            const authorResponse = await axios.get(`http://158.160.203.172:8080/author?id=${bookId}`);
            console.log('Author details:', authorResponse.data);
            
            if (authorResponse.data && authorResponse.data.full_name) {
                bookAuthor.textContent = authorResponse.data.full_name;
            } else {
                bookAuthor.textContent = 'Автор не найден';
            }
        } catch (authorError) {
            console.warn('Ошибка при получении автора:', authorError);
            bookAuthor.textContent = 'Автор не найден';
        }

        try {
            const genreResponse = await axios.get(`http://158.160.203.172:8080/genre`);
            console.log('Genre details:', genreResponse.data);
            console.log('Genre response data:', genreResponse.data.books);
        }
        catch (genreError) {
            console.warn('Ошибка при получении жанра:', genreError);
        }
    }
    catch (error) {
        console.error('Ошибка при получении деталей книги:', error);
    }

}

fetchBookDetails();