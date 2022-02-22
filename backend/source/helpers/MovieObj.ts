import {Movie, MovieMoreInfo, Rating} from "./Interfaces";

/* 
 * MovieObj - handles formatting json, and converting fields to Movie interface.
 *            This class is essentially an implementation of the MovieMoreInfo
 *            interface. It is necessary because the JSON data from any external
 *            location could pass this api poorly formatted JSON. The constructor
 *            makes sure to re-map it to the correct keys. 
 */ 
export class MovieObj {

    /* fields for a MovieObj */
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

    /** 
     * constructor takes a MovieMoreInfo interface and 
     * sets the corresponding values int a MovieObj instance
     */
    constructor(movieMoreInfo : MovieMoreInfo){
        this.imdbID = movieMoreInfo["imdbID"] || "";
        this.imdbRating = movieMoreInfo["imdbRating"] || "";
        this.imdbVotes = movieMoreInfo["imdbVotes"] || "";
        this.Language = movieMoreInfo["Language"] || "";
        this.Metascore = movieMoreInfo["Metascore"] || "";
        this.Plot = movieMoreInfo["Plot"] || "";
        this.Poster = movieMoreInfo["Poster"] || "";
        this.Production = movieMoreInfo["Production"] || "";
        this.Rated = movieMoreInfo["Rated"] || "";
        this.Ratings = movieMoreInfo["Ratings"] || [{Source: "N/a", Value: "N/a"}, {Source: "N/a", Value: "N/a"}];
        this.Released = movieMoreInfo["Released"] || "";
        this.Response = movieMoreInfo["Response"] || "";
        this.Runtime = movieMoreInfo["Runtime"] || "";
        this.Title = movieMoreInfo["Title"] || "";
        this.Type = movieMoreInfo["Type"] || "";
        this.Website = movieMoreInfo["Website"] || "";
        this.Writer = movieMoreInfo["Writer"] || "";
        this.Year = movieMoreInfo["Year"] || "";
        this.Genre = movieMoreInfo["Genre"] || "";
        this.DVD = movieMoreInfo["DVD"] || "";
        this.Director = movieMoreInfo["Director"] || "";
        this.Country = movieMoreInfo["Country"] || "";
        this.BoxOffice = movieMoreInfo["BoxOffice"] || "";
        this.Awards = movieMoreInfo["Awards"] || "";
        this.Actors = movieMoreInfo["Actors"] || "";
    }

    /**
     * toMovie - converts a MovieMoreInfo/MovieObj down to 
     * only the necessary fields for a MovieTile
     *
     * @return Movie - only the movie fields fromt his class
     */  
    toMovie() {
        return {
            imdbID : this.imdbID,
            Poster : this.Poster,
            Title : this.Title,
            Type : this.Type,
            Year : this.Year,
        } as Movie;
    }

}
