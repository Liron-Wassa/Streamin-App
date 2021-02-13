import mongoose from 'mongoose';

async function connectToDb() {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI_PRODUCTION!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log(`MongoDB: connected ${connect.connection.host}`);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    };
};

export default connectToDb;