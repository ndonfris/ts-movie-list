/**
 * @author  Nick Donfris
 * @purpose Handles all data retrieval for the frontend calls
 * pertaining to the popup modal when a movie is pressed on
 *
 * endpoint which the local router instance extends:
 * http://api_url/movie/
 */

import express from "express";
import controller from "../controllers/moreInfo";

const router = express.Router();

router.post("/more_info", controller.moreInfo);
router.post("/streaming", controller.streamingInfo);

export = router;
