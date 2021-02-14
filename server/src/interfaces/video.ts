import { Document } from 'mongoose';
export interface ICategories {
    [key: string]: string,
    trailers: string,
    montages: string
};
export interface IVideo extends Document {
    _id: string,
    resourceUrl: string,
    category: string,
    description: string,
    price: number,
    isUncompleted: boolean,
    resourceId: string
};