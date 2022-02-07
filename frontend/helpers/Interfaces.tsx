/**
 * File:        Interfaces.tsx
 * Author:      Nick Donfris
 * Created:     01/24/22
 * Description: 
 *
 *              The interfaces used throughout the project.
 *
 *              These interfaces are commonly representing JSON
 *              and define fields to that can be refrenced by
 *              call. 
 *
 *              Note that this file and the one in the backend
 *              directory are the exact same. This is intended 
 *              because these directories do not necessarily 
 *              always going to have the same parent directory.
 */


export interface Movie {
    id?: number;
    Type?: string;
    Title?: string;
    Poster?: string;
    Year?: string;
    imdbID?: string;
}

export interface PostRequest {
    method: string;
    mode?: RequestMode;
    headers?: {
        accept: string;
        contentType: string;
    };
    body?: string;
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
