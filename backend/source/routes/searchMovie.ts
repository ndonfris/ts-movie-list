/**
 * @author  Nick Donfris
 * @purpose Handles when a string is searched in the
 * searchbar.
 *
 * endpoint which the local router instance extends:
 * http://api_url/search/
 */

import express from "express";
import controller from "../controllers/searchMovie";

const router = express.Router();

/* endpoint -> "http://api_url/search/title"  */
router.post("/title", controller.searchMovie);

export = router;
