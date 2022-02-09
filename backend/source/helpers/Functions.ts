import { ActorMovie, Movie, MovieMoreInfo } from './Interfaces';

function toMovie(moreInfo: MovieMoreInfo): Movie {
    return {
        imdbID: moreInfo.imdbID,
        Title: moreInfo.Title,
        Type: moreInfo.Type,
        Year: moreInfo.Year,
        Poster: moreInfo.Poster
    } as Movie;
}

interface actorProps {
    imdb_id: string;
    title: string;
    rating: number;
    other: innerProp[];
}

interface innerProp {
    role?: string;
    actor?: {
        imdb_id: string;
        name: string;
    };
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
export default toMovie;
