import express, { Request, Response } from 'express';

const router = express.Router();
const axios = require('axios').default;

router.post('/', async (req: Request, res: Response) => {
    console.log(req.body);
    const search_name: string = req.body.title;
    console.log(search_name);
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
            let moreArr = more.data['Search'];
            for (var i in moreArr) {
                result.data['Search'].push(moreArr[i]);
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(result.data);
    } catch (e) {
        console.log(e);
    }
});


export = router;
