import mongoose, { Schema } from 'mongoose';
import IVideo from '../interfaces/video';
 
const videoSchema: Schema = new Schema({
    src: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true }
},
{
    timestamps: true
});

const Video = mongoose.model<IVideo>('Video', videoSchema);

export default Video;