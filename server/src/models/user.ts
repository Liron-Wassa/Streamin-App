import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user';
import bcrypt from 'bcrypt';

const userSchema: Schema<IUser> = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
}, {
    timestamps: true
});

userSchema.methods.isPasswordMatch = async function(password: string) {
    const isPasswordEqual: boolean = await bcrypt.compare(password, this.password);    

    return isPasswordEqual;
};

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    };

    const hashedPassword: string = await bcrypt.hash(this.password, Number(process.env.SALT_ROUND));

    this.password = hashedPassword;
});

const User = mongoose.model('User', userSchema);

export default User;