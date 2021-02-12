import { Server as SocketServer } from 'socket.io';
import express, { Application } from 'express';
import { findAll } from './services/video';
import videoRoute from './routes/video';
import connectToDb from './config/db';
import userRoute from './routes/user';
import { Server } from 'http';
import dotenv from 'dotenv';
import path from 'path';

//============== App config ==============//

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use('/src/videos', express.static(path.join(__dirname, '/videos')));

//========================================//

//============== Connect to database ==============//

connectToDb();

//=================================================//

//============= Routes ================//

app.use('/api/videos', videoRoute);
app.use('/api/users', userRoute);

//=====================================//

//============== Listening to server ==============//

type StringOrNumber = string | number;

const PORT: StringOrNumber = process.env.PORT || 5000;

const server: Server = app.listen(PORT, () => {
    console.log(`Server has running on port: ${PORT}`);
});

//==================================================//

//=================== Setup socket =================//

const io: SocketServer = new SocketServer(server);

io.on('connection', (socket) => {
    console.log('connect');
    
    socket.on('getUpdatedVideos', async (category: string) => {
        const videos = await findAll({category: category});

        socket.emit('updatedVideos', videos);
    });
});

//==================================================//