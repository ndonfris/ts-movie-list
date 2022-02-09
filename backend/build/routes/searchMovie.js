"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const searchMovie_1 = __importDefault(require("../controllers/searchMovie"));
const router = express_1.default.Router();
router.post('/title', searchMovie_1.default.searchMovie);
module.exports = router;
