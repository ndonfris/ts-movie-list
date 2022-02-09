"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toMovie(moreInfo) {
    return {
        imdbID: moreInfo.imdbID,
        Title: moreInfo.Title,
        Type: moreInfo.Type,
        Year: moreInfo.Year,
        Poster: moreInfo.Poster
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
exports.default = toMovie;
