import mongoose from 'mongoose';

interface IRuleData {
    title: string;
    href: string;
    content: string;
}

export interface IRule extends IRuleData {
    _id?: string;
}

export interface IRuleDocument extends IRuleData, mongoose.Document {}

export interface IShortRule {
    title: IRule['title'];
    href: IRule['href'];
}

export type RulesData = Array<IRuleDocument>;
