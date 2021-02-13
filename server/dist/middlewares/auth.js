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
exports.checkUserAdmin = exports.checkUserLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../services/user");
function checkUserLogin(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token)
            return res.status(401).send('Access failed, token is empty');
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).send('You need to be logged in');
    }
    ;
}
exports.checkUserLogin = checkUserLogin;
;
function checkUserAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.user;
            const foundUser = yield user_1.find({ _id: userId });
            if (!foundUser)
                return res.status(404).send('User not found');
            if (foundUser.isAdmin)
                next();
            else
                res.status(401).send('Not authorized as admin');
        }
        catch (error) {
            res.status(500).send(error.message);
        }
        ;
    });
}
exports.checkUserAdmin = checkUserAdmin;
;
