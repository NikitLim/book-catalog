const bookId = new URLSearchParams(window.location.search).get('id');

console.log('Book ID:', bookId);

const bookTitle = document.querySelector('.name');
const bookAuthor = document.querySelector('.author');
const bookGenre = document.querySelector('.genre');
const bookImage = document.querySelector('.image');
const bookDescription = document.querySelector('.description');

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
            const response = await axios.get(`http://158.160.203.172:8080/book?id=${bookId}`);
            const book = response.data;
            const author = book.author?.[0]; // Получаем первого автора из массива
            bookAuthor.textContent ="Автор: " + (author ? author.full_name : 'Автор не найден');
            console.log('Book author:', book.author);
        } catch (authorError) {
            console.warn('Ошибка при получении автора:', authorError);
            bookAuthor.textContent = 'Автор не найден';
        }

        try {
            const response = await axios.get(`http://158.160.203.172:8080/book?id=${bookId}`);
            const book = response.data;
            const genres = book.genre;
            bookGenre.textContent ="Жанр: " + (Array.isArray(genres) && genres.length
              ? genres.map(g => g.name).join(', ')
              : 'Жанр не найден');
            console.log('Book genre:', book.genre);
        }
        catch (genreError) {
            console.warn('Ошибка при получении жанра:', genreError);
        }

        try {
            const response = await axios.get(`http://158.160.203.172:8080/book?id=${bookId}`);
            const book = response.data;
            const description = book.description;
            bookDescription.textContent = description ? description : 'Описание не найдено';
            console.log('Book description:', book.description);
        }
        catch (descriptionError) {
            console.warn('Ошибка при получении описания:', descriptionError);
        }
    }
    catch (error) {
        console.error('Ошибка при получении деталей книги:', error);
    }

}

fetchBookDetails();