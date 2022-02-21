import express from 'express';
import controller from '../controllers/savedMovies';


const router = express.Router();

router.get('/get/full', controller.getAllMoviesFull);
router.get('/get/less', controller.getAllMoviesLess);
router.post('/add', controller.saveMovie);
router.post('/remove', controller.removeMovie);

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

export = router;
