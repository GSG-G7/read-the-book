# Read the Movie

# Team:
 - Sajeda Ismail
 - Alaa Yasin
 - Fadi Alamassi
 - Imad Shatali

# User Journey
## When the user enters the website, he will be able to:
- to enter a movie or book title name in the search bar
- click search 
- the website shows him the movies and books that match his search text
- the search results are related as book(source material)/movie
- on the movie side he will be able to see
    * movie poster
    * title
    * description
    * rating
    * genre
    * movie casts
    * trailer link/pop up
- on the book side, he will see:
    * book cover
    * title
    * author
    * description
    * rating
    * genre
    * link to goodreads

## stretch goals
- using local storage to save favourites
- open favourites in another page
- pop up embedded youtube video

## api urls:
- themoviedb:
    * https://developers.themoviedb.org/3/search/search-movies
    * https://developers.themoviedb.org/3/movies/get-movie-details ({genre:, overview,original_title, rating)
    * https://developers.themoviedb.org/3/movies/get-movie-credits
    * https://developers.themoviedb.org/3/movies/get-movie-videos
    * images_url = https://image.tmdb.org/t/p/w500/
- goodreads api:
    * search.books
    * https://www.goodreads.com/api/index#book_links
- dependencies
    * https://www.npmjs.com/package/xml2js (because goodreads returns xml)