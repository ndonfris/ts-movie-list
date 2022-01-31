import {PostRequest, Movie, MovieMoreInfo, Rating} from './Interfaces';

export function createRequest(request: PostRequest): RequestInit {
    return {
        method: request.method,
        mode: request.mode,
        headers: {
            'Accept': request.headers.accept,
            'Content-Type': request.headers.contentType
        },
        body: JSON.stringify({"title": request.body})
    }
}

export function failedMovieMoreInfo(found: Movie) : MovieMoreInfo{
    return {
        Title: found.Title,
        Year: found.Year,
        Rated: "N/a",
        Released: found.Year,
        Runtime: "N/a",
        Genre: "N/a",
        Director: "N/a",
        Writer: "N/a",
        Actors: "N/a",
        Plot: "Oops, it looks like there was an error retrieving more info about the " + found.Type + ", " + found.Title + ".",
        Language: "N/a",
        Country: "N/a",
        Awards: "N/a",
        Poster: found.Poster,
        Ratings: [{Source: "N/a", Value: "N/a"}, {Source: "N/a", Value: "N/a"}],
        Metascore: "N/a",
        imdbRating: "N/a",
        imdbVotes: "N/a",
        imdbID: found.imdbID,
        Type: found.Type,
        DVD: "N/a",
        BoxOffice: "N/a",
        Production: "N/a",
        Website: "N/a",
        Response: "N/a"
    };
}
