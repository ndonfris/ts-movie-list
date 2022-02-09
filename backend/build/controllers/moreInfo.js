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
const NAMESPACE = 'More Info';
const axios = require('axios').default;
/**
 * function to retrieve all availabile info for an imdbID
 */
const moreInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Searching for more movie info');
    const search_id = req.body.title;
    logging_1.default.info(NAMESPACE, search_id);
    try {
        const options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: { i: search_id, page: '1', r: 'json', plot: 'full' },
            headers: apiKeys_1.default.moreInfo
        };
        const result = yield axios.request(options);
        res.setHeader('Content-Type', 'application/json');
        logging_1.default.info(NAMESPACE, result);
        res.json(result.data);
    }
    catch (e) {
        logging_1.default.warn(NAMESPACE, 'server error (check if ports are correct)', e);
        console.log(e);
    }
});
/**
 * function to retrieve the streaming info for an imdbID
 */
const streamingInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, 'Searching for where to stream movie');
    const search_id = req.body.title;
    logging_1.default.info(NAMESPACE, search_id);
    try {
        const options = {
            method: 'GET',
            url: 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup',
            params: { source_id: search_id, source: 'imdb', country: 'us' },
            headers: apiKeys_1.default.streamingInfo
        };
        const result = yield axios.request(options);
        const collectionArray = result.data['collection'];
        const locationArray = collectionArray['locations'];
        const resultArray = [];
        for (var i in locationArray) {
            const location = locationArray[i];
            resultArray.push(location);
        }
        res.setHeader('Content-Type', 'application/json');
        console.log(locationArray);
        res.json(locationArray);
    }
    catch (e) {
        console.log(e);
    }
});
exports.default = { moreInfo, streamingInfo };
