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
exports.removeOne = exports.updateOne = exports.getOne = exports.getAll = exports.createVideo = void 0;
const video_1 = require("../services/video");
const fs_1 = __importDefault(require("fs"));
function createVideo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            req.body.src = req.file.path;
            const createdVideo = yield video_1.create(req.body);
            if (!createdVideo)
                return res.status(400).send('Invalid video details');
            res.status(201).send({ videoId: createdVideo._id, videoPath: req.file.path });
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
        ;
    });
}
exports.createVideo = createVideo;
;
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let payload = {};
            if (req.query.category) {
                payload = {
                    category: req.query.category
                };
            }
            ;
            const videos = yield video_1.findAll(payload);
            if (!videos)
                return res.status(404).send('Videos not found');
            res.status(200).send(videos);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
        ;
    });
}
exports.getAll = getAll;
;
function getOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const videoId = req.params.videoId;
            const video = yield video_1.findOne(videoId);
            if (!video)
                return res.status(404).send('Video not found');
            res.status(200).send(video);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
        ;
    });
}
exports.getOne = getOne;
;
function updateOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const videoId = req.params.videoId;
            const videoDetails = req.body;
            const updatedVideo = yield video_1.update(videoId, videoDetails);
            if (!updatedVideo)
                return res.status(404).send('Video not updated');
            res.sendStatus(200);
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
        ;
    });
}
exports.updateOne = updateOne;
;
function removeOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const videoId = req.params.videoId;
            const deletedVideo = yield video_1.remove(videoId);
            if (!deletedVideo)
                return res.status(404).send('Video not deleted');
            yield fs_1.default.unlinkSync(deletedVideo.src);
            res.sendStatus(200);
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
        ;
    });
}
exports.removeOne = removeOne;
;
