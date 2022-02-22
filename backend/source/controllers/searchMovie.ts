import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import apiKeys from "../config/apiKeys";
import { Movie } from "../helpers/Interfaces";

const NAMESPACE = "Query";

const axios = require("axios").default;

/**
* @async searchMovie - searchs for a the movie in the Request.body.title field.
*
* @param req - Request from the caller
*
* @param res - Response from this api, that will be sent to the caller
*/
const searchMovie = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Searching for movies");

    const search_name: string = req.body.title;
    logging.info(NAMESPACE, "Query: " + search_name);

    try {
        const firstPage = {
            method: "GET",
            url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
            params: { s: search_name, page: "1", r: "json" },
            headers: apiKeys.searchMovie,
        };
        const secondPage = {
            method: "GET",
            url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
            params: { s: search_name, page: "2", r: "json" },
            headers: apiKeys.searchMovie,
        };
        const result = await axios.request(firstPage);
        if (result.data["totalResults"] > 11) {
            const more = await axios.request(secondPage);
            let moreArr: Movie[] = more.data["Search"];
            for (var i in moreArr) {
                let secondPageMovie: Movie = moreArr[i];
                result.data["Search"].push(secondPageMovie);
            }
        }
        res.setHeader("Content-Type", "application/json");
        res.send(result.data);
    } catch (e) {
        console.log(e);
    }
};

export default { searchMovie };
