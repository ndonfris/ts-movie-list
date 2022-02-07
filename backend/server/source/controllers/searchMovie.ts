import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
//import {extractActor} from '../helpers/Functions';
import {ActorMovie, Movie} from '../helpers/Interfaces';

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


const searchActor = async (req: Request, res: Response)  => {
    const name : string= req?.params?.id;
    var getIdOptions = {
        method: 'GET',
        url: `'https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/${name}/'`,
        headers: {
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
            'x-rapidapi-key': 'b7a1750641mshd4e6ef3df5d8fe4p1cb598jsn335a11e3b912'
        }
    };
    try {
        const idResult = await axios.request(getIdOptions);
        const actorId = idResult.data[0].name;
        var getMoviesOptions = {
            method: 'GET',
            url: `'https://data-imdb1.p.rapidapi.com/actor/id/nm0000199/series_knownFor/${actorId}'`,
            params: {page_size: '50'},
            headers: {
                'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
                'x-rapidapi-key': 'b7a1750641mshd4e6ef3df5d8fe4p1cb598jsn335a11e3b912'
            }
        };
        const results = await axios.request(getMoviesOptions);
        const foundMovies = [] as ActorMovie[];
        /* for (var i in results) { */
            /* foundMovies.push(extractActor(results[i])); */
        /* } */
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(foundMovies);
    } catch (error) {
        console.log(error);
    }
}


export default { searchMovie, searchActor };
