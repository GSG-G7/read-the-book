const urls = {
    apiKeys : {
       moviedb: "88a88f263d1037a89abd98086e80504c",
       bookdb: "AIzaSyCZxEaGwfrMVo6ZlbLR3_qWsaMYs1LEsR8"
    },
    moviedbSearch : (query) => `https://api.themoviedb.org/3/search/movie?api_key=${urls.apiKeys.moviedb}&language=en-US&query=${query}&page=1&include_adult=false`,
    moviedbDetails : (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${urls.apiKeys.moviedb}&language=en-US`,
    moviedbCredits : (id) => `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${urls.apiKeys.moviedb}`,
    moviedbVideos : (id) => `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${urls.apiKeys.moviedb}&language=en-US`,
    moviedbImageLink: (link) => `https://image.tmdb.org/t/p/w500`+link,
    youtubeLink: (key) => `https://www.youtube.com/watch?v=${key}`,
    googleBookSearch:(query)=> `https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}&key=${urls.apiKeys.bookdb}`
} 

function makeApiRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            callback(xhr.response);
        }
    }
    xhr.open('GET',url);
    xhr.responseType = 'json';
    xhr.send();
}
const moviesdb = {
    search: function (title) {
        makeApiRequest(urls.moviedbSearch(title),function(res){
            res.results.slice(0,7);
        });
    },
    details: function(id) {
        makeApiRequest(urls.moviedbDetails(id), function(res) {
            let obj = {
                overview: res.overview,
                genre: res.genres,
                rating: res.vote_average
            };
        })
    },
    credits: function(id) {
        makeApiRequest(urls.moviedbCredits(id), function(res) {
             res.cast.slice(0,4);
        });
    },
    video: function(id){
        makeApiRequest(urls.moviedbVideos(id), function(res) {
            return urls.youtubeLink(res.results[0].key);
        });
    }
}

const booksdb = {
    search: function (title){
        makeApiRequest(urls.googleBookSearch(title),function(res){
           var First7Results=res.items.slice(0,7);
           console.log(First7Results);

            var First7Results = First7Results.map((value)=>{
             return {title: value.volumeInfo.title,
                     Autors: value.volumeInfo.authors,
                     description: value.volumeInfo.description,
                     averageRating: value.volumeInfo.averageRating,
                     image:value.volumeInfo.imageLinks.thumbnail                     
            
                    }
                   
                });
                console.log(First7Results);
        });
        
    }
}
// console.log(makeApiRequest(urls.googleBookSearch('Me before you'),(x)=> console.log(JSON.parse(x))));
console.log(booksdb.search('Me before you'));
moviesdb.video("296096");
// console.log(makeApiRequest(urls.googleBookSearch('Me before you'),(x)))
