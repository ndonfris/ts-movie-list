"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const savedMovies_1 = __importDefault(require("../controllers/savedMovies"));
const url = 'mongodb://localhost:27017';
const client = new mongodb_1.MongoClient(url);
const dbName = 'movies';
const router = express_1.default.Router();
router.get('/get/full', savedMovies_1.default.getAllMoviesFull);
router.get('/get/less', savedMovies_1.default.getAllMoviesLess);
router.get('/get/info:id', savedMovies_1.default.getInfo);
router.post('/add', savedMovies_1.default.saveMovie);
router.delete('/remove:id', savedMovies_1.default.removeMovie);
module.exports = router;
