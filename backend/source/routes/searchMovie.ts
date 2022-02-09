import express from 'express';
import controller from '../controllers/searchMovie';

const router = express.Router();

router.post('/title', controller.searchMovie);

export = router;
