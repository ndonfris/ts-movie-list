/**
 * @author  Nick Donfris
 * @purpose Handles all data retrieval for the frontend calls
 * pertaining to the saved movies tab.
 *
 * endpoint which the local router instance extends:
 * http://api_url/watch_list/
 */

import express from "express";
import controller from "../controllers/savedMovies";

const router = express.Router();

router.get("/get/full", controller.getAllMoviesFull);
router.get("/get/less", controller.getAllMoviesLess);
router.post("/add", controller.saveMovie);
router.post("/remove", controller.removeMovie);

export = router;
