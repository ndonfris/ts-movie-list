"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Functions_1 = __importDefault(require("../helpers/Functions"));
const mongodb_1 = require("mongodb");
const url = 'mongodb://localhost:27017';
const client = new mongodb_1.MongoClient(url);
const dbName = 'movies';
const getAllMoviesFull = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log('Connected to mongoDB successfully');
        const db = client.db(dbName);
        const collection = db.collection('watchList');
        const findResult = yield collection.find({}).toArray();
        console.log('Found documents =>', findResult);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(findResult);
        client.close();
    }
    catch (error) {
        console.log(error);
    }
});
const getAllMoviesLess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log('Connected to mongoDB successfully');
        const db = client.db(dbName);
        const collection = db.collection('watchList');
        const findResult = yield collection.find({}).toArray();
        const results = [];
        for (var i in findResult) {
            var mv = findResult[i];
            const movie = (0, Functions_1.default)(mv);
            results.push(movie);
        }
        console.log('Found documents =>', results);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(results);
        client.close();
    }
    catch (error) {
        console.log(error);
    }
});
const saveMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const toSave = JSON.parse(req.body.title);
    const filter = {
        imdbID: toSave.Title,
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
        yield client.connect();
        console.log(toSave);
        console.log('Connected to mongoDB successfully');
        console.log(filter);
        const db = client.db(dbName);
        const collection = db.collection('watchList');
        const storeResult = yield collection.insertOne(filter);
        console.log('Stored =>', storeResult);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(storeResult);
        client.close();
    }
    catch (error) {
        console.log(error);
    }
});
const getInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    const filter = {
        imdbID: id
    };
    try {
        yield client.connect();
        console.log('Connected to mongoDB successfully');
        const db = client.db(dbName);
        const collection = db.collection('watchList');
        const result = yield collection.findOne(filter);
        result ? res.status(201).send(`Successfully removed movie with imdbID=${id} from your watchlist`) : res.status(500).send(`Failed to remove imdbId ${id}`);
        client.close();
    }
    catch (error) {
        console.log(error);
    }
});
const removeMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    const filter = {
        imdbID: id
    };
    try {
        yield client.connect();
        console.log('Connected to mongoDB successfully');
        const db = client.db(dbName);
        const collection = db.collection('watchList');
        const result = yield collection.findOneAndDelete(filter);
        result ? res.status(201).send(`Successfully removed movie with imdbID=${id} from your watchlist`) : res.status(500).send(`Failed to remove imdbId ${id}`);
        client.close();
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = { getAllMoviesFull, getAllMoviesLess, saveMovie, removeMovie, getInfo };
