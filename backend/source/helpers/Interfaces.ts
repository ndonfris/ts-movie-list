/**
 * @author: Nick Donfris
 * @purpose: The neccesary interfaces used for the server.
 *
 *     note: this file is essentially the exact same as the
 *           helpers/Interfaces.tsx in the front end (since
 *           they use the same interfaces). In the event
 *           that this server is hosted non-local, the helpers
 *           file would not be accessible.
 */

export interface Movie {
    Type?: string;
    Title?: string;
    Poster?: string;
    Year?: string;
    imdbID?: string;
}

export interface Rating {
    Source?: string;
    Value?: string;
}

export interface MovieMoreInfo {
    Title?: string;
    Year?: string;
    Rated?: string;
    Released?: string;
    Runtime?: string;
    Genre?: string;
    Director?: string;
    Writer?: string;
    Actors?: string;
    Plot?: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    Poster?: string;
    Ratings?: Rating[];
    Metascore?: string;
    imdbRating?: string;
    imdbVotes?: string;
    imdbID?: string;
    Type?: string;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
    Response?: string;
}

export interface MoreInfo extends Document {
    Title?: string;
    Year?: string;
    Rated?: string;
    Released?: string;
    Runtime?: string;
    Genre?: string;
    Director?: string;
    Writer?: string;
    Actors?: string;
    Plot?: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    Poster?: string;
    Ratings?: Rating[];
    Metascore?: string;
    imdbRating?: string;
    imdbVotes?: string;
    imdbID?: string;
    Type?: string;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
    Response?: string;
}

export interface StreamCountry {
    itemNumber?: number;
    location?: string;
}

export interface StreamWebsite {
    country?: StreamCountry[];
    display_name?: string;
    icon?: string;
    id?: string;
    name?: string;
    url?: string;
}

export interface ActorMovie {
    imdbID?: string;
    title?: string;
    raing?: number;
    role?: string;
}
