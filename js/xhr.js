const urls = {
    apiKeys : {
       moviedb: "88a88f263d1037a89abd98086e80504c",
       bookdb: "AIzaSyCZxEaGwfrMVo6ZlbLR3_qWsaMYs1LEsR8",
    },
    moviedbSearch : (query) => `https://api.themoviedb.org/3/search/movie?api_key=${urls.apiKeys.moviedb}&language=en-US&query=${query}&page=1&include_adult=false`,
    moviedbDetails : (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${urls.apiKeys.moviedb}&language=en-US`,
    moviedbCredits : (id) => `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${urls.apiKeys.moviedb}`,
    moviedbVideos : (id) => `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${urls.apiKeys.moviedb}&language=en-US`,
    moviedbImageLink: (link) => `https://image.tmdb.org/t/p/w500`+link,
    googleBookSearch:(query)=> `https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}&key=${urls.apiKeys.bookdb}`

} 

function makeApiRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            callback(xhr.responseText);
        }
    }
    xhr.open('GET',url);
    xhr.send();
}
// search function
const moviesdb = {
    search: function (title) {
        makeApiRequest(urls.moviedbSearch(title),function(responseText){
            return JSON.parse(responseText).results.slice(0,7);
        });
    },
<<<<<<< HEAD
}
console.log(makeApiRequest(urls.moviedbSearch("me before you"),(x)=> console.log(x)))
console.log(makeApiRequest(urls.googleBookSearch("me before you"),(x)=> console.log(x)))
=======
    details: function(id) {
        makeApiRequest(urls.moviedbDetails(id), function(responseText) {
            let response = JSON.parse(responseText);
            return {
                overview: response.overview,
                genre: response.genres,
                rating: response.vote_average
            };


        })
    }
}
>>>>>>> 6b5df6f4a875ab5a5687108944a19937bb232d95
