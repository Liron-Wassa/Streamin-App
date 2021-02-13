"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.videoValidation = void 0;
const joi_1 = __importDefault(require("joi"));
function videoValidation(req, res, next) {
    function isValidCategory() {
        const category = req.body.category;
        const categories = {
            trailers: "טריילרים",
            montages: "מונטאז'ים",
            advertisement: "פרסומות"
        };
        for (const key in categories) {
            if (categories[key] === category)
                return true;
        }
        ;
        return false;
    }
    ;
    if (!isValidCategory())
        return res.status(400).send('Invalid category');
    const videoSchema = joi_1.default.object({
        category: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        isUncompleted: joi_1.default.boolean()
    });
    const { error } = videoSchema.validate(req.body);
    if (error)
        res.status(400).send(error.details[0].message);
    else
        next();
}
exports.videoValidation = videoValidation;
;
function loginValidation(req, res, next) {
    const loginSchema = joi_1.default.object({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    });
    const { error } = loginSchema.validate(req.body);
    if (error)
        res.status(400).send(error.details[0].message);
    else
        next();
}
exports.loginValidation = loginValidation;
;
