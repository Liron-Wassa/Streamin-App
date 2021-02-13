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
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const video_1 = require("./services/video");
const video_2 = __importDefault(require("./routes/video"));
const db_1 = __importDefault(require("./config/db"));
const user_1 = __importDefault(require("./routes/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
//============== App config ==============//
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
app.use('/src/videos', express_1.default.static(path_1.default.join(__dirname, '/videos')));
//========================================//
//============== Connect to database ==============//
db_1.default();
//=================================================//
//============= Routes ================//
app.use('/api/videos', video_2.default);
app.use('/api/users', user_1.default);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '/../../client/build')));
    app.get('*', (req, res) => res.sendFile(path_1.default.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')));
}
;
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server has running on port: ${PORT}`);
});
//==================================================//
//=================== Setup socket =================//
const io = new socket_io_1.Server(server);
io.on('connection', (socket) => {
    console.log('connect');
    socket.on('getUpdatedVideos', (category) => __awaiter(void 0, void 0, void 0, function* () {
        const videos = yield video_1.findAll({ category: category });
        socket.emit('updatedVideos', videos);
    }));
});
//==================================================//
