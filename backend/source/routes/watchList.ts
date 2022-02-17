import express from 'express';
import { MongoClient } from 'mongodb';
import controller from '../controllers/savedMovies';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'movies';

const router = express.Router();

router.get('/get/full', controller.getAllMoviesFull);
router.get('/get/less', controller.getAllMoviesLess);
router.get('/get/info:id', controller.getInfo);
router.post('/add', controller.saveMovie);
//router.delete('/remove:id', controller.removeMovie);
router.post('/remove', controller.removeMovie);

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

export = router;
