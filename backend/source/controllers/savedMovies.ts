import { toMovie } from '../helpers/Functions';
import { Movie } from '../helpers/Interfaces';
import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import Mongo from '../config/db';
import { MovieObj } from '../helpers/MovieMoreInfoClass';

const mongo = new Mongo();
const url = 'mongodb://localhost:27017';
let client = new MongoClient(url);
const dbName = 'movies';

const getAllMoviesFull = async (req: Request, res: Response) => {
    try {
        await mongo.connect();
        mongo.connectToCollection('watchList');
        const allRecords = await mongo.getAllRecordsFull();
        console.log('Found documents =>', allRecords);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(allRecords);
    } catch (error) {
        console.log(error);
    } finally {
        await mongo.disconnect();
    }
};

const getAllMoviesLess = async (req: Request, res: Response) => {
    try {
        await mongo.connect();
        mongo.connectToCollection('watchList');
        const allRecords : Movie[] = await mongo.getAllRecordsLess();
        console.log('Found documents =>', allRecords);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(allRecords);
    } catch (error) {
        console.log(error);
    } finally {
        await mongo.disconnect();
    }
};

const saveMovie = async (req: Request, res: Response) => {
    const filter = new MovieObj(req.body.title);
    try {
        await mongo.connect();
        mongo.connectToCollection('watchList');
        const storeResult = await mongo.storeFilter(filter);
        console.log('Stored =>', storeResult);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(storeResult);
    } catch (error) {
        console.log(error);
    } finally {
        await mongo.disconnect();
    }
};

const removeMovie = async (req: Request, res: Response) => {
    const toRemove = req.body.title;
    const filter = { imdbID: toRemove };
    try {
        await mongo.connect();
        mongo.connectToCollection('watchList');
        var removeResult = await mongo.removeFilter(filter);
        console.log(removeResult);
        removeResult ? res.status(201).json({'removed': toRemove}) : res.status(500).json({'failed': toRemove});
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
};

export default { getAllMoviesFull, getAllMoviesLess, saveMovie, removeMovie };
