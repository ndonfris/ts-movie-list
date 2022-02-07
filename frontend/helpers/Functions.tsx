/**
 * File:        Functions.tsx
 * Author:      Nick Donfris
 * Created:     02/06/22
 * Description: This file exports functions used throughout the entire 
 * frontend of this application. These functions are typically used to
 * help simplify the readability of the components in the application. 
 * Building the json needed to send a request to  the backend, and defining
 * what a default state should contain for an Interface, are some examples
 * of what I decided to include here.
 */

import {PostRequest, Movie, MovieMoreInfo, StreamWebsite} from './Interfaces';

/**
 * requestHelper(bodyString) - this function is similiar to createRequest. However, instead
 *                             of passing in the entire Interface of options, only the string 
 *                             used in the body (as a value for the key "title"), is
 *                             passed in. 
 *
 * @param {string} bodyString - the string of the post request to call to the backend.
 * @returns {RequestInit} - defines a request to send to a backend URI,
 *                          with this request having the request method, headers, mode
 *                          defined. Also sets the body set to the key "title"
 */
export function requestHelper(bodyString : string ): RequestInit {
    return {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"title": bodyString}),
    }
}

/**
 * createRequest(PostRequest) - Returns part of a Request with all of the 
 *                              fields defined in the parameter passed in.
 *
 * @param {PostRequest} request - interface containing a method, more, headers,
 *
 * @returns {RequestInit} - the Request to send the back (without the URI),
 *                          with the fields set to their defined values in the
 *                          request parameter 
 */
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


/**
 * This function is called when a movie is expected to show more info, but 
 * the call to the backend failed. 
 *
 * @param {Movie} found - the Movie interface that was found from the search screen
 *                        
 * @returns {MovieMoreInfo} - A object, with all availible fields from the Movie
 *                            inserted to the MovieMoreInfo interface.
 */
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

/**
 * noStreamingSites(imdbID) - defines a default behavior for the streaming sites
 *                            of a movie when no results are found.
 *
 * @param {string} imdbID - the string of the imdbID field from a Movie interface
 * 
 * @returns {StreamWebsite[]} - an array of 1 StreamingWebsite, with only only the 
 *                              id, name, display_name, and county.number fields set
 */
export function noStreamingSites(imdbID : string): StreamWebsite[] {
    return [{
        id: imdbID,
        icon: "",
        name: "Not Found",
        url: "",
        display_name: "n/a",
        country: [
            {
                itemNumber: 0,
                location: "",
            },
        ],
    }]
}

