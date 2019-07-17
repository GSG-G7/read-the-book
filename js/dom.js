const selector = (id) => document.querySelector(`#${id}`);

const movieResults = selector('result-movies');
const bookResults = selector('result-books');


selector('search-btn').addEventListener('click', function () {
    moviesdb.search(selector('search-input').value, renderMovies);
    booksdb.search(selector('search-input').value, renderBooks)
})
selector('search-input').addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
        moviesdb.search(selector('search-input').value, renderMovies);
        booksdb.search(selector('search-input').value, renderBooks);
    }
})

function renderMovies(res) {
    let oldContainer = selector('result-movie-container');
    let container = document.createElement('div');
    container.id = 'result-movie-container';
    res.forEach(id => {
        moviesdb.details(id, function (movie) {
            const movieNode = createMovieNode(movie);
            container.appendChild(movieNode);
        });
    });
    container.classList.add('result-movies-container');
    movieResults.replaceChild(container, oldContainer);
}

function createMovieNode(obj) {
    const div = document.createElement('div');
    const imgDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    const title = document.createElement('h2');
    const img = document.createElement('img');
    const overview = document.createElement('p');
    const genre = document.createElement('p')
    const ratingDiv = document.createElement('div');
    const rating = document.createElement('span');
    const ratingIco = document.createElement('i');

    moviesdb.credits(obj.id, function (cast) {
        const p = document.createElement('p');
        p.textContent = "Cast: " + cast.join(', ');
        textDiv.appendChild(p);
    });
    moviesdb.video(obj.id, function (link) {
        if (link) {
            const a = document.createElement('a');
            a.href = link;
            a.target = 'blank';
            a.textContent = 'Show Trailer';
            textDiv.appendChild(a);
        }
    });

    rating.textContent = " " + obj.rating;
    title.textContent = obj.name;
    img.src = obj.posterLink;
    overview.textContent = obj.overview;
    genre.textContent = "Genre: " + obj.genre.join(', ')

    ratingIco.classList.add('fas', 'fa-star', 'star-color');
    img.classList.add('result-movie-image');
    imgDiv.classList.add('result-movie-imageDiv');
    textDiv.classList.add('result-movie-textDiv');

    ratingDiv.appendChild(ratingIco);
    ratingDiv.appendChild(rating);
    textDiv.appendChild(title);
    textDiv.appendChild(ratingDiv)
    textDiv.appendChild(overview);
    textDiv.appendChild(genre);
    imgDiv.appendChild(img);

    div.appendChild(imgDiv);
    div.appendChild(textDiv);
    div.classList.add('result-movieNode')

    return div;
}


function renderBooks(res) {
    const oldContainer = selector('result-book-container');
    const newContainer = document.createElement('div');
    newContainer.id = 'result-book-container';
    res.forEach(book => {
        const bookNode = createBookNode(book);
        newContainer.appendChild(bookNode);

    });
    bookResults.replaceChild(newContainer, oldContainer);
}

function createBookNode(book) {
    const div = document.createElement('div');
    const imgDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    const title = document.createElement('h2');
    const img = document.createElement('img');
    const overview = document.createElement('p');
    const genre = document.createElement('p')
    const ratingDiv = document.createElement('div');
    const rating = document.createElement('span');
    const ratingIco = document.createElement('i');

    rating.textContent = " " + book.averageRating;
    title.textContent = book.title;
    img.src = book.image;
    overview.textContent = book.description;


    ratingIco.classList.add('fas', 'fa-star', 'star-color');
    img.classList.add('result-book-image');
    imgDiv.classList.add('result-book-imageDiv');
    textDiv.classList.add('result-book-textDiv');
    ratingDiv.appendChild(ratingIco);
    ratingDiv.appendChild(rating);
    imgDiv.appendChild(img);
    textDiv.appendChild(title);
    if (book.averageRating !== undefined)
        textDiv.appendChild(ratingDiv);

    if (book.category !== undefined)
        genre.textContent = "Genre: " + book.category.join(', ')

    if (overview.textContent !== "undefined") {
        textDiv.appendChild(overview);
    }
    if (genre.textContent !== "undefined") {
        textDiv.appendChild(genre);
    }


    div.appendChild(imgDiv);
    div.appendChild(textDiv);
    div.classList.add('result-bookNode')
    return div;
}