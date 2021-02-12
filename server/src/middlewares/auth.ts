import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { find } from '../services/user';

export function checkUserLogin(req: Request, res: Response, next: NextFunction) {
    try {
        const token: string | undefined = req.headers.authorization;

        if(!token) return res.status(401).send('Access failed, token is empty');

        const decoded = jwt.verify(token, process.env.SECRET!);
        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).send('You need to be logged in');
    };
};

export async function checkUserAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.user;

        const foundUser = await find({_id: userId});
        if(!foundUser) return res.status(404).send('User not found');

        if(foundUser.isAdmin) next();
        else res.status(401).send('Not authorized as admin');
        
    } catch (error) {
        res.status(500).send(error.message);
    };
};