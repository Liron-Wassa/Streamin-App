"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const video_1 = require("../controllers/video");
const auth_1 = require("../middlewares/auth");
const validation_1 = require("../middlewares/validation");
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const router = express_1.Router();
const storage = multer_1.default.diskStorage({
    destination(req, file, callBack) {
        callBack(null, 'src/videos/');
    },
    filename(req, file, callBack) {
        const uniqueFileName = `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`;
        callBack(null, uniqueFileName);
    }
});
const checkFileType = (file, callBack) => {
    const fileTypes = /mp4|mov|wmv/;
    const extensionName = path_1.default.extname(file.originalname).toLowerCase();
    const isVideoType = fileTypes.test(extensionName);
    const isVideoMimeType = fileTypes.test(file.mimetype);
    if (isVideoType && isVideoMimeType) {
        callBack(null, true);
    }
    else {
        callBack('Only videos');
    }
    ;
};
const upload = multer_1.default({
    storage,
    fileFilter: (req, file, callBack) => {
        checkFileType(file, callBack);
    }
});
router.get('/', video_1.getAll);
router.get('/contents', auth_1.checkUserLogin, auth_1.checkUserAdmin, video_1.getAll);
router.get('/:videoId', auth_1.checkUserLogin, auth_1.checkUserAdmin, video_1.getOne);
router.post('/', auth_1.checkUserLogin, auth_1.checkUserAdmin, upload.single('video'), video_1.createVideo);
router.patch('/:videoId', auth_1.checkUserLogin, auth_1.checkUserAdmin, validation_1.videoValidation, video_1.updateOne);
router.delete('/:videoId', auth_1.checkUserLogin, auth_1.checkUserAdmin, video_1.removeOne);
module.exports = router;
