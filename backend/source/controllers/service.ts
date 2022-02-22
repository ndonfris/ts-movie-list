import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";

const NAMESPACE = "Service Controller";

/**
* healthCheck - callback function for an API call that does not have any
*               route/resouce. Called when the API URI does not have any
*               endpoint.
*
*               i.e.:
*                     http://localhost:3000/
*                           or
*                     http://ts-movie-server.herokuapp.com/
*
* @param req - Request from frontend
*
* @param res - Response from backend
*
*/
const healthCheck = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Health check route called.`);

    /* log the request body if there was any */
    let found = req.body;
    console.log(found);

    /* send response verifying that api is running*/
    return res.status(200).json({
        message: "hit",
    });
};

export default { healthCheck };
