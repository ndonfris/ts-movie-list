
export interface Movie {
    id?: number;
    Type?: string;
    Title?: string;
    Poster?: string;
    Year?: string;
    imdbID?: string;
}

export interface MovieArray {
    array: Movie[];
}

export interface RequestHeaders{
    accept: string;
    contentType: string;
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
