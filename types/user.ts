import { Document, Model } from 'mongoose';

export interface IUserDocument extends Document {
    login: string;
    password: string;
    tokens: Array<string>;
}

export interface IUserModel extends Model<IUserDocument> {
    findByCredentials: (login: string, password: string) => Promise<IUserDocument>;
}
