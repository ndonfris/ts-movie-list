
import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import {MovieMoreInfo} from '../interfaces/Interfaces';
import {StreamWebsite} from '../interfaces/Interfaces';


const NAMESPACE = 'More Info';

const axios = require('axios').default;

/**
 * function to retrieve all availabile info for an imdbID
 */
const moreInfo = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Searching for more movie info');

    const search_id: string = req.body.title;
    logging.info(NAMESPACE, search_id);
    try {
        const options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: { i: search_id, page: '1', r: 'json', plot: 'full' },
            headers: {
                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
                'x-rapidapi-key': 'b7a1750641mshd4e6ef3df5d8fe4p1cb598jsn335a11e3b912'
            }
        };
        const result = await axios.request(options);
        res.setHeader('Content-Type', 'application/json');
        logging.info(NAMESPACE, result);
        res.json(result.data as MovieMoreInfo);
    } catch (e) {
        logging.warn(NAMESPACE, "server error (check if ports are correct)", e);
        console.log(e);
    }
};

/**
 * function to retrieve the streaming info for an imdbID
 */
const streamingInfo = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Searching for where to stream movie');

    const search_id: string = req.body.title;
    logging.info(NAMESPACE, search_id);

    try {
        const options = {
          method: 'GET',
          url: 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup',
          params: {source_id: search_id, source: 'imdb', country: 'us'},
          headers: {
            'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
            'x-rapidapi-key': 'b7a1750641mshd4e6ef3df5d8fe4p1cb598jsn335a11e3b912'
          }
        };
        const result = await axios.request(options);
        const collectionArray = result.data['collection'];
        const locationArray: StreamWebsite[] = collectionArray['locations'];
        const resultArray: StreamWebsite[] = [];
        for (var i in locationArray) {
            const location: StreamWebsite = locationArray[i];
            resultArray.push(location);
        }
        res.setHeader('Content-Type', 'application/json');
        console.log(locationArray);
        res.json(locationArray);
    } catch (e) {
        console.log(e);
    }
};

export default { moreInfo, streamingInfo };
