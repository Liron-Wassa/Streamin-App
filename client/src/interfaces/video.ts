export interface IVideo {
    _id: string,
    src: string,
    category: string,
    title: string,
    price: number,
    isUncompleted: boolean,
    updatedAt: string
};

export interface ICategories {
    [key: string]: string,
    trailers: string,
    montages: string
};