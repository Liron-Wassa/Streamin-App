"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.findOne = exports.findAll = exports.create = void 0;
const video_1 = __importDefault(require("../models/video"));
function create(videoDetails) {
    return (new Promise((resolve, reject) => {
        video_1.default.create(videoDetails, (error, createdVideo) => {
            if (error)
                reject(new Error(error.message));
            else
                resolve(createdVideo);
        });
    }));
}
exports.create = create;
;
function findAll(payload) {
    return (new Promise((resolve, reject) => {
        video_1.default.find(payload, (error, foundVideos) => {
            if (error)
                reject(new Error(error));
            else
                resolve(foundVideos);
        });
    }));
}
exports.findAll = findAll;
;
function findOne(id) {
    return (new Promise((resolve, reject) => {
        video_1.default.findById(id, null, null, (error, foundVideo) => {
            if (error)
                reject(new Error(error.message));
            else
                resolve(foundVideo);
        });
    }));
}
exports.findOne = findOne;
;
function update(videoId, videoDetails) {
    return (new Promise((resolve, reject) => {
        video_1.default.findByIdAndUpdate(videoId, videoDetails, null, (error, updatedVideo) => {
            if (error)
                reject(new Error(error));
            else
                resolve(updatedVideo);
        });
    }));
}
exports.update = update;
;
function remove(videoId) {
    return (new Promise((resolve, reject) => {
        video_1.default.findByIdAndDelete(videoId, null, (error, deletedVideo) => {
            if (error)
                reject(new Error(error));
            else
                resolve(deletedVideo);
        });
    }));
}
exports.remove = remove;
;
