import express, {Request, Response} from 'express';

const router = express.Router();
const mss = require('movie-scirpt-scraper');
const axios = require('axios').default;


router.post('/', async (req: Request, res: Response) => {
    console.log(req.body);
    const search_id: string = req.body.title;
    console.log(search_id);
    try {
        const options = {
            genre: 'Action',
            total: 10,
        };
        const result = await mss(options);
        res.setHeader('Content-Type', 'application/json');
        console.log(result);
        res.json(result);
    } catch (e) {
        console.log(e);
    }
});

export = router;

