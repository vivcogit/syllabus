import mongoose from 'mongoose';

export interface IUserDocument extends mongoose.Document {
    login: string;
    password: string;
    tokens: Array<string>;
}

export interface IUserModel extends mongoose.Model<IUserDocument> {
    findByCredentials: (login: string, password: string) => Promise<IUserDocument>;
}
