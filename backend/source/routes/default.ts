/**
 * @author  Nick Donfris
 * @purpose Handles when the api is called, but no
 * endpoint is specified. Used to show if the api is
 * running and also logs if there was json data passed
 * in with the Request.
 *
 * endpoint which the local router instance extends:
 * http://api_url/
 */

import express from "express";
import controller from "../controllers/service";

const router = express.Router();

/* endpoint -> "http://api_url/"  */
router.get("", controller.healthCheck);

export = router;
