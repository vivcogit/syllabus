import mongoose from 'mongoose';

import { Entity } from '../Entity';

export interface User extends Entity {
    login: string;
    password: string;
    tokens: Array<string>;
}

export interface ServerUser extends User, mongoose.Document {
    generateAuthToken: () => string;
}
