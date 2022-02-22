/**
 * If you were trying to recreate this project, follow these steps
 *       1.) go to http://rapidapi.com make a free account
 *       2.) go grab the api's listed in the controller files
 *       3.) make sure to subscribe to them and then replace the headers
 *           below
 *       4.) rename this file to apiKeys.ts
 */

const MORE_INFO_HEADERS = {
  "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
  "x-rapidapi-key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
};

const STREAMING_INFO_HEADERS = {
  "x-rapidapi-host":
    "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
  "x-rapidapi-key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
};

const SEARCH_MOVIE = {
  "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
  "x-rapidapi-key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
};

const SEARCH_ACTOR = {
  "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
  "x-rapidapi-key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
};

const apiKeys = {
  searchMovie: SEARCH_MOVIE,
  searchActor: SEARCH_ACTOR,
  moreInfo: MORE_INFO_HEADERS,
  streamingInfo: STREAMING_INFO_HEADERS,
};

export default apiKeys;
