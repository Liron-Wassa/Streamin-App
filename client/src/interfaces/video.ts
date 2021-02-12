export interface IVideo {
    _id?: string,
    src?: string,
    category?: string,
    updatedAt?: string,
    description: string,
    price: number | string,
    isUncompleted: boolean
};

export interface ICategories {
    [key: string]: string,
    trailers: string,
    montages: string
};