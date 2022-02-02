import express, {Request, Response} from 'express';

interface StreamCountry {
    itemNumber?: number;
    location?: string;
}
interface StreamWebsite {
    country?: StreamCountry[];
    dispaly_name?: string;
    icon?: string;
    id?: string;
    name?: string;
    url?: string;
}

const router = express.Router();
const axios = require('axios').default;


router.post('/', async (req: Request, res: Response) => {
    console.log(req.body);
    const search_id: string = req.body.title;
    console.log(search_id);
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
        const resultArray = [];
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
});

export = router;
