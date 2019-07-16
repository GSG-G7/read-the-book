const urls = {
    apiKeys : {
       moviedb: "88a88f263d1037a89abd98086e80504c",
       bookdb:"AIzaSyCpKMgL4JrjDRVYbOUTaHTj587XvMi153Y",
    },
    moviedbSearch : (query) => `https://api.themoviedb.org/3/search/movie?api_key=${urls.apiKeys.moviedb}&language=en-US&query=${query}&page=1&include_adult=false`,
    moviedbDetails : (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${urls.apiKeys.moviedb}&language=en-US`,
    moviedbCredits : (id) => `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${urls.apiKeys.moviedb}`,
    moviedbVideos : (id) => `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${urls.apiKeys.moviedb}&language=en-US`,
    moviedbImageLink: (link) => `https://image.tmdb.org/t/p/w500`+link,
    googleBookSearch: (query) => `https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}&key=${urls.apiKeys.goodreads}`
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

// console.log(makeApiRequest(urls.moviedbSearch("me before you"),(x)=> console.log(x)))
console.log(makeApiRequest(urls.googleBookSearch("me before you"),(x)=> console.dir(JSON.parse(x))))