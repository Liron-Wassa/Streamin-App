import { IUser } from "../interfaces/user";
import User from '../models/user';

function create(userDetails: IUser): Promise<IUser> {
    return (
        new Promise((resolve, reject) => {
            const user = new User(userDetails);

            user.save((error, savedUser) => {
                if(error) reject(new Error(error.message));
                else resolve(savedUser);
            });
        })
    );
};

function find(payload: object): Promise<IUser> {
    return (
        new Promise((resolve, reject) => {
            User.findOne(payload, (error: Error, foundUser: IUser) => {
                if(error) reject(new Error(error.message));
                else resolve(foundUser);
            });
        })
    );
};

export {
    create,
    find
};