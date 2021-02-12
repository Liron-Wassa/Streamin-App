import { Request, Response } from 'express';
import { find } from '../services/user';
import jwt from 'jsonwebtoken';

async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const foundUser = await find({email});
        if(!foundUser) return res.status(404).send('User not found');

        const isAuthenticatedUser: boolean = await foundUser.isPasswordMatch(password);
        if(!isAuthenticatedUser) return res.status(401).send('Email or password wrong');
        
        const token: string = jwt.sign({email, userId: foundUser._id}, process.env.SECRET!);

        res.send(token);
        
    } catch (error) {
        res.status(500).send(error.message);
    };
};

export {
    login
};