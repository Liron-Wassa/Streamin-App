import { Document } from 'mongoose';

interface IVideo extends Document {
    src: string,
    category: string,
    title: string,
    price: number
};

export default IVideo;