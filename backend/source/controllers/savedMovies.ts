import toMovie from '../helpers/Functions';
import { MovieMoreInfo, Movie, MoreInfo } from '../helpers/Interfaces';
import { Request, Response } from 'express';
import { MongoClient, WithId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'movies';

const getAllMoviesFull = async (req: Request, res: Response) => {
    try {
        await client.connect();
        console.log('Connected to mongoDB successfully');
        const db = client.db(dbName);
        const collection = db.collection('watchList');
        const findResult = await collection.find({}).toArray();
        console.log('Found documents =>', findResult);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(findResult);
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const getAllMoviesLess = async (req: Request, res: Response) => {
    try {
        await client.connect();
        console.log('Connected to mongoDB successfully');
        const db = client.db(dbName);
        const collection = db.collection('watchList');
        const findResult: WithId<MovieMoreInfo>[] = await collection.find({}).toArray();
        const results = [] as Movie[];
        for (var i in findResult) {
            var mv: MovieMoreInfo = findResult[i];
            const movie: Movie = toMovie(mv);
            results.push(movie);
        }
        console.log('Found documents =>', results);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(results);
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const saveMovie = async (req: Request, res: Response) => {
    const toSave = JSON.parse(req.body.title);
    const filter = {
        imdbID: toSave.imdbID,
        imdbRating: toSave.imdbRating,
        imdbVotes: toSave.imdbVotes,
        Language: toSave.Language,
        Metascore: toSave.Metascore,
        Plot: toSave.Plot,
        Poster: toSave.Poster,
        Production: toSave.Production,
        Rated: toSave.Rated,
        Ratings: toSave.Ratings,
        Released: toSave.Released,
        Response: toSave.Response,
        Runtime: toSave.Runtime,
        Title: toSave.Title,
        Type: toSave.Type,
        Website: toSave.Website,
        Writer: toSave.Writer,
        Year: toSave.Year,
        Genre: toSave.Genre,
        DVD: toSave.DVD,
        Director: toSave.Director,
        Country: toSave.Country,
        BoxOffice: toSave.BoxOffice,
        Awards: toSave.Awards,
        Actors: toSave.Actors
    };
    try {
        await client.connect();
        console.log(toSave);
        console.log('Connected to mongoDB successfully');
        console.log(filter);
        const db = client.db(dbName);
        const collection = db.collection('watchList');
        const storeResult = await collection.insertOne(filter);
        console.log('Stored =>', storeResult);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(storeResult);
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const getInfo = async (req: Request, res: Response) => {
    const id: string = req?.params?.id;
    const filter = {
        imdbID: id
    };
    try {
        await client.connect();
        console.log('Connected to mongoDB successfully');
        const db = client.db(dbName);
        const collection = db.collection('watchList');
        const result = await collection.findOne(filter);
        result ? res.status(201).send(`Successfully removed movie with imdbID=${id} from your watchlist`) : res.status(500).send(`Failed to remove imdbId ${id}`);
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const removeMovie = async (req: Request, res: Response) => {
    const toRemove = req.body.title;
    //const id = JSON.parse(req.body.title);
    console.log(req.body);
    //console.log(id);
    const filter = {
        imdbID: toRemove
    };
    try {
        await client.connect();
        console.log('Connected to mongoDB successfully');
        const db = client.db(dbName);
        const collection = db.collection('watchList');
        const result = await collection.findOneAndDelete(filter);
        console.log(result);
        result ? res.status(201).send(`Successfully removed movie with imdbID=${toRemove} from your watchlist`) : res.status(500).send(`Failed to remove imdbId ${toRemove}`);
        client.close();
    } catch (error) {
        console.log(error);
    }
};

export default { getAllMoviesFull, getAllMoviesLess, saveMovie, removeMovie, getInfo };
