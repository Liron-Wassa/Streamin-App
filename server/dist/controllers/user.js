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
exports.login = void 0;
const user_1 = require("../services/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const foundUser = yield user_1.find({ email });
            if (!foundUser)
                return res.status(404).send('User not found');
            const isAuthenticatedUser = yield foundUser.isPasswordMatch(password);
            if (!isAuthenticatedUser)
                return res.status(401).send('Email or password wrong');
            const token = jsonwebtoken_1.default.sign({ email, userId: foundUser._id }, process.env.SECRET);
            res.send(token);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
        ;
    });
}
exports.login = login;
;
