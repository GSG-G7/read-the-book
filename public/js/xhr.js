const urls = {
    apiKeys: {
        moviedb: "88a88f263d1037a89abd98086e80504c",
        bookdb: "AIzaSyCpKMgL4JrjDRVYbOUTaHTj587XvMi153Y"
    },
    moviedbSearch: (query) => `https://api.themoviedb.org/3/search/movie?api_key=${urls.apiKeys.moviedb}&language=en-US&query=${query}&page=1&include_adult=false`,
    moviedbDetails: (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${urls.apiKeys.moviedb}&language=en-US`,
    moviedbCredits: (id) => `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${urls.apiKeys.moviedb}`,
    moviedbVideos: (id) => `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${urls.apiKeys.moviedb}&language=en-US`,
    moviedbImageLink: (link) => `https://image.tmdb.org/t/p/w500` + link,
    youtubeLink: (key) => `https://www.youtube.com/watch?v=${key}`,
    googleBookSearch: (query) => `https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}&key=${urls.apiKeys.bookdb}`
}

function makeApiRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.response);
        }
    }
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
}
const moviesdb = {
    search: function (title, cb) {
        makeApiRequest(urls.moviedbSearch(title), function (res) {
            cb(res.results.slice(0, 7).map(e => e.id));
        });
    },
    details: function (id, cb) {
        makeApiRequest(urls.moviedbDetails(id), function (res) {
            cb({
                id: id,
                name: res.original_title,
                posterLink: urls.moviedbImageLink(res.poster_path),
                overview: res.overview,
                genre: res.genres.map(e => e.name),
                rating: res.vote_average ? res.vote_average : "no rating"
            });
        })
    },
    credits: function (id, cb) {
        makeApiRequest(urls.moviedbCredits(id), function (res) {
            cb(res.cast.slice(0, 4).map(e => e.name));
        });
    },
    video: function (id, cb) {
        makeApiRequest(urls.moviedbVideos(id), function (res) {
            if (res.results[0] !== undefined)
                cb(urls.youtubeLink(res.results[0].key));
            else
                cb(undefined);
        });
    }
}
const booksdb = {
    search: function (title, cb) {
        makeApiRequest(urls.googleBookSearch(title), function (res) {
            cb(res.items.slice(0, 7).map((value) => {
                return {
                    title: value.volumeInfo.title,
                    Autors: value.volumeInfo.authors,
                    description: value.volumeInfo.description,
                    averageRating: value.volumeInfo.averageRating,
                    image: value.volumeInfo.imageLinks.thumbnail,
                    category: value.volumeInfo.categories
                }
            }));
        })

    }
}