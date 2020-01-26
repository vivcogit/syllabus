/* global process */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IUserDocument, IUserModel } from '../../../types/user';

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate: (value: string): boolean => {
            if (!value || value.length < 6) {
                throw new Error('Invalid password');
            }

            return true;
        }
    },
    tokens: {
        type: [],
        default: [],
    },
});

userSchema.pre<IUserDocument>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }

    next();
});

userSchema.methods.generateAuthToken = async function (): Promise<string> {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY);
    this.tokens = this.tokens.concat({ token, stamp: new Date().getTime(), });

    await this.save();

    return token;
}

userSchema.statics.findByCredentials = async (login: string, password: string): Promise<IUserDocument> => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const user = await User.findOne({ login });
    
    if (!user) {
        return null;
    }
    
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if (!isPasswordMatch) {
        return null;
    }
    
    return user;
}

let User: IUserModel;
try {
    User = mongoose.model<IUserDocument, IUserModel>('User');
} catch (error) {
    User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);
}

export default User;
