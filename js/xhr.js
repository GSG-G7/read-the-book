const urls = {
    apiKeys : {
       moviedb: "88a88f263d1037a89abd98086e80504c",
    },
    moviedbSearch : (query) => `https://api.themoviedb.org/3/search/movie?api_key=${urls.apiKeys.moviedb}&language=en-US&query=${query}&page=1&include_adult=false`,
    moviedbDetails : (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${urls.apiKeys.moviedb}&language=en-US`,
    moviedbCredits : (id) => `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${urls.apiKeys.moviedb}`,
    moviedbVideos : (id) => `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${urls.apiKeys.moviedb}&language=en-US`,
    moviedbImageLink: (link) => `https://image.tmdb.org/t/p/w500`+link,
    youtubeLink: (key) => `https://www.youtube.com/watch?v=${key}`
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
    details: function(id) {
        makeApiRequest(urls.moviedbDetails(id), function(responseText) {
            let response = JSON.parse(responseText);
            return {
                overview: response.overview,
                genre: response.genres,
                rating: response.vote_average
            };
        })
    },
    credits: function(id) {
        makeApiRequest(urls.moviedbCredits(id), function(responseText) {
            return JSON.parse(responseText).cast.slice(0,4);
        });
    },
    video: function(id){
        makeApiRequest(urls.moviedbVideos(id), function(responseText) {
            let results = JSON.parse(responseText);
            return urls.youtubeLink(results.results[0].key);
        });
    }
}
moviesdb.video("296096");