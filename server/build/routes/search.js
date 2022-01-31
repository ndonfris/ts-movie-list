"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const axios = require('axios').default;
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const search_name = req.body.title;
    console.log(search_name);
    try {
        const options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: { s: search_name, page: '1', r: 'json' },
            headers: {
                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
                'x-rapidapi-key': 'b7a1750641mshd4e6ef3df5d8fe4p1cb598jsn335a11e3b912'
            }
        };
        const result = yield axios.request(options);
        res.setHeader('Content-Type', 'application/json');
        res.send(result.data);
    }
    catch (e) {
        console.log(e);
    }
}));
module.exports = router;
