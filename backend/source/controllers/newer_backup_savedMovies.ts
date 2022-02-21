import {toMovie, toMovieMoreInfo} from '../helpers/Functions';
import { MovieMoreInfo, Movie, MoreInfo } from '../helpers/Interfaces';
import { Request, Response } from 'express';
import { MongoClient, WithId } from 'mongodb';

const url = 'mongodb://localhost:27017';
let client = new MongoClient(url);

const dbName = 'movies';

const getAllMoviesFull = async (req: Request, res: Response) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('watchList');
        await client.connect();
        console.log('Connected to mongoDB successfully');
        const findResult = await collection.find({}).toArray();
        console.log('Found documents =>', findResult);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(findResult);
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
};

const getAllMoviesLess = async (req: Request, res: Response) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('watchList');
        await client.connect();
        console.log('Connected to mongoDB successfully');
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
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
};

const saveMovie = async (req: Request, res: Response) => {
    const reqBody = req.body.title;
    const filter = {
        imdbID: reqBody["imdbID"],
        imdbRating: reqBody["imdbRating"],
        imdbVotes: reqBody["imdbVotes"],
        Language: reqBody["Language"],
        Metascore: reqBody["Metascore"],
        Plot: reqBody["Plot"],
        Poster: reqBody["Poster"],
        Production: reqBody["Production"],
        Rated: reqBody["Rated"],
        Ratings: reqBody["Ratings"],
        Released: reqBody["Released"],
        Response: reqBody["Response"],
        Runtime: reqBody["Runtime"],
        Title: reqBody["Title"],
        Type: reqBody["Type"],
        Website: reqBody["Website"],
        Writer: reqBody["Writer"],
        Year: reqBody["Year"],
        Genre: reqBody["Genre"],
        DVD: reqBody["DVD"],
        Director: reqBody["Director"],
        Country: reqBody["Country"],
        BoxOffice: reqBody["BoxOffice"],
        Awards: reqBody["Awards"],
        Actors: reqBody["Actors"],
    };
    console.log(filter);
    try {
        await client.connect();
        console.log('Connected to mongoDB successfully');
        const db = client.db(dbName);
        const collection = db.collection('watchList');
        const storeResult = await collection.insertOne(filter);
        console.log('Stored =>', storeResult);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(storeResult);
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
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
        result ? res.status(201).json({'removed': toMovie}) : res.status(500).json({'failed': toMovie});
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
};

const removeMovie = async (req: Request, res: Response) => {
    const toRemove = req.body.title;
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
        result ? res.status(201).json({'removed': toRemove}) : res.status(500).json({'failed': toRemove});
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
};

export default { getAllMoviesFull, getAllMoviesLess, saveMovie, removeMovie, getInfo };
