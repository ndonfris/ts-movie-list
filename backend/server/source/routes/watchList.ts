import express from 'express';
import controller from '../controllers/savedMovies';

const router = express.Router();

router.post('/add', controller.createMovie);
router.post('/remove', controller.removeMovie);
router.get('/get', controller.getAllMovies);

export = router;
