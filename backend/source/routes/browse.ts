/**
 * @author  Nick Donfris
 * @purpose handle all data retrieval for the frontend calls
 * pertaining to the browse movies tab.
 *
 * endpoint which the local router instance extends:
 * http://api_url/browse/
 */

import express from "express";
import controller from "../controllers/filterMovies";

const router = express.Router();

router.post("/genre", controller.genreSearch);

export = router;
