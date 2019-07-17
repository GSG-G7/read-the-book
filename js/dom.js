const selector = (id) => document.querySelector(`#${id}`);

const movieResults = selector('result-movies');
selector('search-btn').addEventListener('click', function () {
    moviesdb.search(selector('search-input').value, renderMovies);
})
selector('search-input').addEventListener('keydown', function (e) {
    if (e.key == 'Enter')
        moviesdb.search(selector('search-input').value, renderMovies);
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
   movieResults.replaceChild(container,oldContainer);
}

function createMovieNode(obj) {
    const div = document.createElement('div');
    const imgDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    const title = document.createElement('h2');
    const img = document.createElement('img');
    const overview = document.createElement('p');
    const genre = document.createElement('p')
    const rating = document.createElement('span');
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
    overview.textContent = "Synopsis: " + obj.overview;
    genre.textContent = "Genre: " + obj.genre.join(', ')

    title.appendChild(rating);
    textDiv.appendChild(title);
    textDiv.appendChild(overview);
    textDiv.appendChild(genre);
    imgDiv.appendChild(img);

    div.appendChild(imgDiv);
    div.appendChild(textDiv);

    return div;
}