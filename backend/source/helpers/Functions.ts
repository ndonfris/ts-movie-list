import { Movie, MovieMoreInfo } from "./Interfaces";
import { Response } from "express";

/* Helper function to convert a MovieMoreInfo interface, to a Movie interface
 * object.
 *
 * @param moreInfo - MovieMoreInfo interface (contains keys seen in function below)
 *
 * @return Movie - a movie object, effectively removing the unnecessary MovieMoreInfo
 *                 fields.
 */
export function toMovie(moreInfo: MovieMoreInfo): Movie {
    return {
        imdbID: moreInfo.imdbID,
        Title: moreInfo.Title,
        Type: moreInfo.Type,
        Year: moreInfo.Year,
        Poster: moreInfo.Poster,
    } as Movie;
}

/**
 * Helper function to retrieve a correctly formatted document to be inserted
 * into the movies MongoDB. Need to use the [] format because toSave needs any
 * type
 *
 * @param toSave - the unformatted Body from the json Request (from the caller)
 *
 * @return Document<MovieMoreInfo> - properly placed keys and values used in
 *                                   the MongoDB.
 */
export function toMovieMoreInfo(toSave: any) {
    const filter = {
        imdbID: toSave["imdbID"],
        imdbRating: toSave["imdbRating"],
        imdbVotes: toSave["imdbVotes"],
        Language: toSave["Language"],
        Metascore: toSave["Metascore"],
        Plot: toSave["Plot"],
        Poster: toSave["Poster"],
        Production: toSave["Production"],
        Rated: toSave["Rated"],
        Ratings: toSave["Ratings"],
        Released: toSave["Released"],
        Response: toSave["Response"],
        Runtime: toSave["Runtime"],
        Title: toSave["Title"],
        Type: toSave["Type"],
        Website: toSave["Website"],
        Writer: toSave["Writer"],
        Year: toSave["Year"],
        Genre: toSave["Genre"],
        DVD: toSave["DVD"],
        Director: toSave["Director"],
        Country: toSave["Country"],
        BoxOffice: toSave["BoxOffice"],
        Awards: toSave["Awards"],
        Actors: toSave["Actors"],
    } as MovieMoreInfo;
    return filter;
}


/**
 * checkKey - checks if the key param exists in the bodyObj
 * 
 * @param bodyObj - a json object of the body from a request
 * @param key - the key to check for
 *
 * @return boolean - true if bodyObj[key] exists
 */
export function checkKey(bodyObj: {}, key: string) {
    return key in bodyObj;
}

/**
 * generateErrorResponse - called in some of the controllers if 
 *                         the checkKey helper function returns false.
 *                         It then generates an error message for the api 
 *                         to return.
 * 
 * @param res - Response from controller callback
 * @param caller - string of the controller where the error occurred
 * @param extraInfo - string of aditional information about why controller
 *                    the controller failed
 *
 * @return return_type - return_description
 */
export function generateErrorResponse(res: Response, caller: string, extraInfo: string) {
    console.log("Error seen at: " + caller);
    if (extraInfo.length > 0) {
        console.log("extraInfo: " + extraInfo);
    }
    res.status(500).send(`Failed at ${caller}`);
}
