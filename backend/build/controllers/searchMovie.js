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
const logging_1 = __importDefault(require("../config/logging"));
const apiKeys_1 = __importDefault(require("../config/apiKeys"));
const NAMESPACE = 'Query';
const axios = require('axios').default;
const searchMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Searching for movies');
    const search_name = req.body.title;
    logging_1.default.info(NAMESPACE, 'Query: ' + search_name);
    try {
        const firstPage = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: { s: search_name, page: '1', r: 'json' },
            headers: apiKeys_1.default.searchMovie
        };
        const secondPage = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: { s: search_name, page: '2', r: 'json' },
            headers: apiKeys_1.default.searchMovie
        };
        const result = yield axios.request(firstPage);
        if (result.data['totalResults'] > 11) {
            const more = yield axios.request(secondPage);
            let moreArr = more.data['Search'];
            for (var i in moreArr) {
                let secondPageMovie = moreArr[i];
                result.data['Search'].push(secondPageMovie);
            }
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(result.data);
    }
    catch (e) {
        console.log(e);
    }
});
const searchActor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const name = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    var getIdOptions = {
        method: 'GET',
        url: `'https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/${name}/'`,
        headers: apiKeys_1.default.searchActor
    };
    try {
        const idResult = yield axios.request(getIdOptions);
        const actorId = idResult.data[0].name;
        var getMoviesOptions = {
            method: 'GET',
            url: `'https://data-imdb1.p.rapidapi.com/actor/id/nm0000199/series_knownFor/${actorId}'`,
            params: { page_size: '50' },
            headers: apiKeys_1.default.searchActor
        };
        const results = yield axios.request(getMoviesOptions);
        const foundMovies = [];
        /* for (var i in results) { */
        /* foundMovies.push(extractActor(results[i])); */
        /* } */
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(foundMovies);
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = { searchMovie, searchActor };
