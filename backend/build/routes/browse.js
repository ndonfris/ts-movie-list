"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const filterMovies_1 = __importDefault(require("../controllers/filterMovies"));
const router = express_1.default.Router();
router.post('/genre', filterMovies_1.default.genreSearch);
module.exports = router;
