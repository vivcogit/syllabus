/* global process */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { ServerUser } from '../../../entities/User';

interface ServerUserModel extends mongoose.Model<ServerUser> {
    findByCredentials: (login: string, password: string) => Promise<ServerUser>;
    findByToken: (token: string) => Promise<ServerUser>;
    checkToken: (token: string) => Promise<boolean>;
}

let ServerUserImpl: ServerUserModel;

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

userSchema.pre<ServerUser>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }

    next();
});

userSchema.methods.generateAuthToken = async (): Promise<string> => {
    const token = jwt.sign({ _id: this.id }, process.env.JWT_KEY);
    this.tokens = this.tokens.concat({ token, stamp: new Date().getTime(), });

    await this.save();

    return token;
}

userSchema.statics.findByToken = async (token: string): Promise<ServerUser> => {
    const data = jwt.verify(token, process.env.JWT_KEY) as string | { _id: string };

    try {
        if (typeof data === 'string') {
            throw new Error('data is string');
        }

        const user = await ServerUserImpl.findOne({
            _id: new mongoose.Types.ObjectId(data._id),
            'tokens.token': token,
        });

        if (!user) {
            throw new Error('user is false');
        }

        return user;
    } catch (error) {
        return null;
    }
}

userSchema.statics.checkToken = async (token: string): Promise<boolean> => {
    const user = ServerUserImpl.findByToken(token);

    return !!user;
}

userSchema.statics.findByCredentials = async (login: string, password: string): Promise<ServerUser> => {
    const user = await ServerUserImpl.findOne({ login });

    if (!user) {
        return null;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if (!isPasswordMatch) {
        return null;
    }

    return user;
}

try {
    ServerUserImpl = mongoose.model<ServerUser, ServerUserModel>('User');
} catch (error) {
    ServerUserImpl = mongoose.model<ServerUser, ServerUserModel>('User', userSchema);
}

export default ServerUserImpl;
