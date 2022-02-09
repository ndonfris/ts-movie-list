import { Request, Response } from 'express';
import { MongoClient, WithId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'movies';

const genreSearch = async (req: Request, res: Response) => {
    const genre: string = req.body.Genre;
    const genreString = genre;
    const filter = {
        Genre: {
            $regex: genreString
        }
    };
    console.log(genreString);
    try {
        await client.connect();
        console.log('Connected to mongoDB successfully');
        const db = client.db(dbName);
        const collection = db.collection('topIMDbExtended');
        const results = await collection.find(filter).toArray();
        console.log(results);
        res.status(201).json(results);
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const allMovies = async (req: Request, res: Response) => {
    try {
        await client.connect();
        console.log('Connected to mongoDB successfully');
        const db = client.db(dbName);
        const collection = db.collection('topIMDbExtended');
        const results = await collection.find({}).toArray();
        results ? res.status(201).json(results) : res.status(500).send(`Failed to retreive top 250 imdb movies`);
        client.close();
    } catch (error) {
        console.log(error);
    }
};

export default { genreSearch, allMovies };
