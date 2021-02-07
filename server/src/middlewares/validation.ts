import { Request, Response, NextFunction } from 'express';
import { ICategories } from '../interfaces/video';
import joi from 'joi';

export function videoValidation(req: Request, res: Response, next: NextFunction) {    
        
    function isValidCategory(): boolean {
        const category: string = req.body.category;

        const categories: ICategories = {
            trailers: "טריילרים",
            montages: "מונטאז'ים",
            advertisement: "פרסומות"
        };

        for (const key in categories) {
            if(categories[key] === category) return true;
        };

        return false;
    };

    if(!isValidCategory()) return res.status(400).send('Invalid category');

    const videoSchema = joi.object({
        category: joi.string().required(),
        title: joi.string().required(),
        price: joi.number().required(),
        isUncompleted: joi.boolean()
    });

    const { error } = videoSchema.validate(req.body);

    if(error) res.status(400).send(error.details[0].message);
    else next();
};