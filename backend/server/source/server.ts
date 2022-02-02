import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import SearchRoute from './routes/searchMovie';
import ShowMoreRoute from './routes/showMore';
import WatchListRoute from './routes/watchList';

const NAMESPACE = 'Server';
const router = express();

/* Logging the request */
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging.info(
            NAMESPACE,
            `METHOD - [${req.method}],
                    URL - [${req.url}], IP - [${req.socket.remoteAddress}],
                    STATUS - [${res.statusCode}]`
        );
    });

    next();
});
/* Parse the request */
/* gets rid of using JSON.parse() or JSON.stringify() */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* Rules of the API */
/* eventually change {Access-Control-Allow-Origin', '*'}  to predefined ip's*/
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/* Routes */
router.use('/search', SearchRoute);
router.use('/movie', ShowMoreRoute);
router.use('/watch_list', WatchListRoute);
/* router.use('/browse', BrowseRoute); */

/* Error Handling */
router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

/* Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
