"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
const searchMovie_1 = __importDefault(require("./routes/searchMovie"));
const showMore_1 = __importDefault(require("./routes/showMore"));
const watchList_1 = __importDefault(require("./routes/watchList"));
const browse_1 = __importDefault(require("./routes/browse"));
const NAMESPACE = 'Server';
const router = (0, express_1.default)();
/* Logging the request */
router.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging_1.default.info(NAMESPACE, `METHOD - [${req.method}],
                    URL - [${req.url}], IP - [${req.socket.remoteAddress}],
                    STATUS - [${res.statusCode}]`);
    });
    next();
});
/* Parse the request */
/* gets rid of using JSON.parse() or JSON.stringify() */
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
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
router.use('/search', searchMovie_1.default);
router.use('/movie', showMore_1.default);
router.use('/watch_list', watchList_1.default);
router.use('/browse', browse_1.default);
/* Error Handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});
/* Create the server */
const httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server is running ${config_1.default.server.hostname}:${config_1.default.server.port}`));
