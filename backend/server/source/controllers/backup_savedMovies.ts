import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
import { MovieMoreInfo } from '../interfaces/Interfaces';

const NAMESPACE = 'Movies';
/* 
`INSERT INTO movies ( Title, Year, Rated, Released, Runtime, Genre, Director, Writer,
                    Actors, Plot, Language, Country, Awards, Poster, Ratings, Metascore,
                    imdbRating, imdbVotes, imdbID, Type, DVD, BoxOffice, Production, Website )

VALUES ("${movie.Title}", "${movie.Year}", "${movie.Rated}", "${movie.Released}", "${movie.Runtime}", "${movie.Genre}", "${movie.Director}", "${movie.Writer}",
"${movie.Actors}", "${movie.Plot}", "${movie.Language}", "${movie.Country}", "${movie.Awards}", "${movie.Poster}", "${movie.Ratings}", "${movie.Metascore}",
"${movie.imdbRating}", "${movie.imdbVotes}", "${movie.imdbID}", "${movie.Type}", "${movie.DVD}", "${movie.BoxOffice}", "${movie.Production}", "${movie.Website}" )`
 */

const createMovie = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting movies');

    let movie:  MovieMoreInfo = req.body;

    let query = `INSERT INTO movies (Title, Year, Rated, Released, Runtime, Genre, Director, Writer,
                 Actors, Plot, Language, Country, Awards, Poster, Ratings, Metascore,
                 imdbRating, imdbVotes, imdbID, Type, DVD, BoxOffice, Production, Website)
    VALUES ("${movie.Title}", "${movie.Year}", "${movie.Rated}", "${movie.Released}", "${movie.Runtime}", "${movie.Genre}", "${movie.Director}", "${movie.Writer}",
    "${movie.Actors}", "${movie.Plot}", "${movie.Language}", "${movie.Country}", "${movie.Awards}", "${movie.Poster}", "${movie.Ratings}", "${movie.Metascore}",
    "${movie.imdbRating}", "${movie.imdbVotes}", "${movie.imdbID}", "${movie.Type}", "${movie.DVD}", "${movie.BoxOffice}", "${movie.Production}", "${movie.Website}")`

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'Movies created: ', result);
                    /* here */
                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all movies.');

    let query = 'SELECT * FROM movies';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Retrieved movies: ', results);

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

export default { createMovie, getAllMovies };
