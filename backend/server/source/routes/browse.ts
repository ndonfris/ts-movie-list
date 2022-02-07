import express from 'express';
import controller from '../controllers/filterMovies';

const router = express.Router();

router.post('/genre', controller.genreSearch);


export = router;

