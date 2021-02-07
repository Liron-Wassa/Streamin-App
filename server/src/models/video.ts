import { IVideo } from '../interfaces/video';
import mongoose, { Schema } from 'mongoose';
 
const videoSchema: Schema = new Schema({
    src: { type: String, required: true },
    category: { type: String, default: '' },
    title: { type: String, default: '' },
    price: { type: Number, default: null },
    isUncompleted: { type: Boolean, default: true }
},
{
    timestamps: true
});

const Video = mongoose.model<IVideo>('Video', videoSchema);

export default Video;