/* 
INSERT INTO movies ( Title, Year, Rated, Released, Runtime, Genre, Director, Writer,
                    Actors, Plot, Language, Country, Awards, Poster, Ratings, Metascore,
                    imdbRating, imdbVotes, imdbID, Type, DVD, BoxOffice, Production, Website )

VALUES ("${movie.Title}", "${movie.Year}", "${movie.Rated}", "${movie.Released}", "${movie.Runtime}", "${movie.Genre}", "${movie.Director}", "${movie.Writer}",
"${movie.Actors}", "${movie.Plot}", "${movie.Language}", "${movie.Country}", "${movie.Awards}", "${movie.Poster}", "${movie.Ratings}", "${movie.Metascore}",
"${movie.imdbRating}", "${movie.imdbVotes}", "${movie.imdbID}", "${movie.Type}", "${movie.DVD}", "${movie.BoxOffice}", "${movie.Production}", "${movie.Website}" )
 */
import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Movie, MovieMoreInfo } from '../interfaces/Interfaces';

const NAMESPACE = 'Movies';


const createMovie = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Inserting movies');

    const db = require('better-sqlite3')('/home/ndonfris/Projects/frontends/react-projects/typescript/ios/ts-movie-list/backend/server/source/controllers/movies.db');

    let movie: Movie = req.body;
    const query: string = `INSERT INTO savedMovies (poster, title, type, year, imdbId) VALUES ('${movie.Poster}', '${movie.Title}', '${movie.Type}', '${movie.Year}', '${movie.imdbID}');`;
    const result = db.prepare(query).run();
    logging.info(NAMESPACE, 'returned: ', result);
    return res.status(200).json(result);
};

const getAllMovies = (req: Request, res: Response) => {
    const db = require('better-sqlite3')('/home/ndonfris/Projects/frontends/react-projects/typescript/ios/ts-movie-list/backend/server/source/controllers/movies.db');
    logging.info(NAMESPACE, 'Getting all movies.');
    let query = 'SELECT * FROM savedMovies';
    const result : Movie[] = db.prepare(query).all();
    logging.info(NAMESPACE, 'returned: ', result);
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(result);
    return res;
};

const removeMovie = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Inserting movies');

    const db = require('better-sqlite3')('/home/ndonfris/Projects/frontends/react-projects/typescript/ios/ts-movie-list/backend/server/source/controllers/movies.db');
    const remove_id: string = req.body.title;

    const query: string = `DELETE FROM savedMovies WHERE imdbID = '${remove_id}';`;
    const result = db.prepare(query).run();
    logging.info(NAMESPACE, 'returned: ', result);
    return res.status(200).json(result);
}

export default { createMovie, getAllMovies, removeMovie };
