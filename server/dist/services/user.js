"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = exports.create = void 0;
const user_1 = __importDefault(require("../models/user"));
function create(userDetails) {
    return (new Promise((resolve, reject) => {
        const user = new user_1.default(userDetails);
        user.save((error, savedUser) => {
            if (error)
                reject(new Error(error.message));
            else
                resolve(savedUser);
        });
    }));
}
exports.create = create;
;
function find(payload) {
    return (new Promise((resolve, reject) => {
        user_1.default.findOne(payload, (error, foundUser) => {
            if (error)
                reject(new Error(error.message));
            else
                resolve(foundUser);
        });
    }));
}
exports.find = find;
;
