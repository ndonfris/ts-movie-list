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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const url = 'mongodb://localhost:27017';
const client = new mongodb_1.MongoClient(url);
const dbName = 'movies';
const genreSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = req.body.Genre;
    const genreString = genre;
    const filter = {
        Genre: {
            $regex: genreString
        }
    };
    console.log(genreString);
    try {
        yield client.connect();
        console.log('Connected to mongoDB successfully');
        const db = client.db(dbName);
        const collection = db.collection('topIMDbExtended');
        const results = yield collection.find(filter).toArray();
        console.log(results);
        res.status(201).json(results);
        client.close();
    }
    catch (error) {
        console.log(error);
    }
});
const allMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log('Connected to mongoDB successfully');
        const db = client.db(dbName);
        const collection = db.collection('topIMDbExtended');
        const results = yield collection.find({}).toArray();
        results ? res.status(201).json(results) : res.status(500).send(`Failed to retreive top 250 imdb movies`);
        client.close();
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = { genreSearch, allMovies };
