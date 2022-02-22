import { checkKey, generateErrorResponse } from "../helpers/Functions";
import { Movie } from "../helpers/Interfaces";
import { Request, Response } from "express";
import Mongo from "../config/db";
import {MovieObj} from "../helpers/MovieObj";

/* initialize Mongo instance for all controllers */
const mongo = new Mongo();

/**
 * @async getAllMoviesFull - retrieves the movies from the watchList collection and
 *                           returns them as objects of the interface MovieMoreInfo
 *
 * @param req - the Request data from the frontend (req is not used because GET 'verb' )
 * @param res - The Response this callback generates
 *
 */
const getAllMoviesFull = async (req: Request, res: Response) => {
    try {
        await mongo.connect();
        mongo.connectToCollection('watchList');
        const allRecords = await mongo.getAllRecordsFull();
        console.log('Found documents =>', allRecords);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(allRecords);
    } catch (error) {
        console.log(error);
    } finally {
        await mongo.disconnect();
    }
};

/**
 * @async getAllMoviesLess - retrieves the movies from the watchList collection and
 *                           returns them as objects of the interface Movie. This is
 *                           used in the frontend to render the movie tiles for the
 *                           Watchlist. It also allows for us to not call the external api
 *                           to retrieve movie info for the MovieTile
 *
 * @param req - the Request data from the frontend (req is not used because GET 'verb' )
 * @param res - The Response this callback generates
 *
 */
const getAllMoviesLess = async (req: Request, res: Response) => {
    try {
        await mongo.connect();
        mongo.connectToCollection('watchList');
        const allRecords : Movie[] = await mongo.getAllRecordsLess();
        console.log('Found documents =>', allRecords);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(allRecords);
    } catch (error) {
        console.log(error);
    } finally {
        await mongo.disconnect();
    }
};

/**
 * @async saveMovie - saves a movie in the MongoDB. This callback attempts to
 *                    save all relevent information about the movie, to eliminante
 *                    external api calls (which cost money).
 *
 * @param req - the Request data from the frontend (POST request so there is JSON data)
 * @param res - The Response this callback generates
 *
 */
const saveMovie = async (req: Request, res: Response) => {
    if (!checkKey(req.body, "title")) {
        generateErrorResponse(res, "saveMovie", "no title key");
        return;
    }
    const filter = new MovieObj(req.body.title);
    try {
        await mongo.connect();
        mongo.connectToCollection('watchList');
        const storeResult = await mongo.storeFilter(filter);
        console.log('Stored =>', storeResult);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(storeResult);
    } catch (error) {
        console.log(error);
    } finally {
        await mongo.disconnect();
    }
};


/**
 * @async removeMofie - removes a movie from the 'movies' mongoDB collection named 'watchList'
 *
 * @param req - the Request data from the frontend (POST request so there is JSON data)
 * @param res - The Response this callback generates
 *
 */
const removeMovie = async (req: Request, res: Response) => {
    if (!checkKey(req.body, "title")) {
        generateErrorResponse(res, "saveMovie", "no title key");
        return;
    }
    const toRemove = req.body.title;
    const filter = { imdbID: toRemove };
    try {
        await mongo.connect();
        mongo.connectToCollection('watchList');
        var removeResult = await mongo.removeFilter(filter);
        console.log(removeResult);
        removeResult ? res.status(201).json({'removed': toRemove}) : res.status(500).json({'failed': toRemove});
    } catch (error) {
        console.log(error);
    } finally {
        await mongo.disconnect();
    }
};

export default {
    getAllMoviesFull,
    getAllMoviesLess,
    saveMovie,
    removeMovie
};
