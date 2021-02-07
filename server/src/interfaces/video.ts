import { Document } from 'mongoose';
export interface ICategories {
    [key: string]: string,
    trailers: string,
    montages: string
};
export interface IVideo extends Document {
    _id: string,
    src: string,
    category: string,
    title: string,
    price: number,
    isUncompleted: boolean
};