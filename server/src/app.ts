import express, { Application } from 'express';
import videoRoute from './routes/video';
import connectToDb from './config/db';
import dotenv from 'dotenv';

//============== App config ==============//

dotenv.config();

const app: Application = express();

app.use(express.json());

//========================================//

//============== Connect to database ==============//

connectToDb();

//=================================================//

//============= Routes ================//

app.use('/videos', videoRoute);

//=====================================//


//============== Listening to server ==============//

type StringOrNumber = string | number;

const PORT: StringOrNumber = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server has running on port: ${PORT}`);
});

//==================================================//