import { IVideo } from '../interfaces/video';
import mongoose, { Schema } from 'mongoose';
 
const videoSchema: Schema<IVideo> = new Schema({
    src: { type: String, required: true },
    category: { type: String, default: '' },
    description: { type: String, default: '' },
    price: { type: Number, default: null },
    isUncompleted: { type: Boolean, default: true }
},
{
    timestamps: true
});

const Video = mongoose.model('Video', videoSchema);

export default Video;