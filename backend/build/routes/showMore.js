"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const moreInfo_1 = __importDefault(require("../controllers/moreInfo"));
const router = express_1.default.Router();
router.post('/moreInfo', moreInfo_1.default.moreInfo);
router.post('/streaming', moreInfo_1.default.streamingInfo);
module.exports = router;
