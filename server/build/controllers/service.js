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
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'Service Controller';
const sampleHealthCheck = (req, res, next) => {
    logging_1.default.info(NAMESPACE, `Sample health check route called.`);
    let found = req.body();
    console.log(found);
    return res.status(200).json({
        message: 'pong'
    });
};
exports.default = { sampleHealthCheck };
const postHealthCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.params.id;
});
