import Mongo from '../config/db';
import { Movie, MovieMoreInfo } from './Interfaces';

export function toMovie(moreInfo: MovieMoreInfo): Movie {
    return {
        imdbID: moreInfo.imdbID,
        Title: moreInfo.Title,
        Type: moreInfo.Type,
        Year: moreInfo.Year,
        Poster: moreInfo.Poster
    } as Movie;
}

export function toMovieMoreInfo(toSave : any) {
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
    };
    return filter;
}

export async function getAllMoviesHelper(mongo: Mongo) {
    await mongo.connect();


}

//function extractActor(Props: actorProps) {
//    return {
//        imdbID: Props.imdb_id,
//        title: Props.title,
//        rating: Props.rating,
//        role: Props.other[0].role
//    } as ActorMovie;
//}
//
//export default {toMovie, extractActor};
