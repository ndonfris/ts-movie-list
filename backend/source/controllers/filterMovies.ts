import { Request, Response } from "express";
import { checkKey, generateErrorResponse } from "../helpers/Functions";
import Mongo from '../config/db';

/* initialize Mongo instance for both controllers */
const mongo = new Mongo();

/**
 * @async genreSearch - searches the topIMDb collection in the movies
 *                      MongoDB, by the Genre passed in through the body
 *                      of the Request.
 *
 * @param req - Request sent from frontend, formatted:
 *              { "body" : "genre" }
 *
 * @param response - Response containing the movies found
 */
const genreSearch = async (req: Request, res: Response) => {
    if (!checkKey(req.body, "Genre")) {
        generateErrorResponse(res, "genreSearch", "no genre key");
        return;
    }
    const genre: string = req.body.Genre;
    /* creates a filter, using regex to search the Genre Strings in the Database */
    const filter = { Genre: { $regex: genre } };
    try {
        await mongo.connect();
        mongo.connectToCollection("topIMDbExtended");
        const results = await mongo.getEveryMatchingRecord(filter);
        res.status(201).json(results);
    } catch (error) {
        console.log(error);
        res.status(501).json({});
    } finally {
        await mongo.disconnect();
    }
};

/**
 * @async allMovies - retrieve all movies in the topIMDbExtended collection
 *                    in the mongodb
 *
 * @param req - empty Request from the fronted, since allMovies is called from
 *              a get request.
 *
 * @param res - all movies in the topIMDbExtended database.
 */
const allMovies = async (req: Request, res: Response) => {
    try {
        await mongo.connect();
        mongo.connectToCollection("topIMDbExtended");
        const results = await mongo.getAllRecordsFull();
        results
            ? res.status(201).json(results)
            : res.status(500).json({});
    } catch (error) {
        console.log(error);
    } finally {
        await mongo.disconnect();
    }

};

export default { genreSearch, allMovies };
