import express, {Request, Response} from 'express';

const router = express.Router();
const axios = require('axios').default;


router.post('/', async (req: Request, res: Response) => {
    console.log(req.body);
    const search_id: string = req.body.title;
    console.log(search_id);
    try {
        const options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: { i: search_id, page: '1', r: 'json' },
            headers: {
                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
                'x-rapidapi-key': 'b7a1750641mshd4e6ef3df5d8fe4p1cb598jsn335a11e3b912'
            }
        };
        const result = await axios.request(options);
        res.setHeader('Content-Type', 'application/json');
        console.log(result);
        res.json(result.data);
    } catch (e) {
        console.log(e);
    }
});

export = router;
