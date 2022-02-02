import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import {Movie} from '../interfaces/Interfaces';


const NAMESPACE = 'Query';

const axios = require('axios').default;

const searchMovie = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Searching for movies');

    const search_name: string = req.body.title;
    logging.info(NAMESPACE, "Query: " + search_name);

    try {
        const firstPage = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: { s: search_name, page: '1', r: 'json' },
            headers: {
                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
                'x-rapidapi-key': 'b7a1750641mshd4e6ef3df5d8fe4p1cb598jsn335a11e3b912'
            }
        };
        const secondPage = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: { s: search_name, page: '2', r: 'json' },
            headers: {
                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
                'x-rapidapi-key': 'b7a1750641mshd4e6ef3df5d8fe4p1cb598jsn335a11e3b912'
            }
        };
        const result = await axios.request(firstPage);
        if (result.data['totalResults'] > 11) {
            const more = await axios.request(secondPage);
            let moreArr: Movie[] = more.data['Search'];
            for (var i in moreArr) {
                let secondPageMovie: Movie = moreArr[i];
                result.data['Search'].push(secondPageMovie);
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(result.data);
    } catch (e) {
        console.log(e);
    }
};


export default { searchMovie };
