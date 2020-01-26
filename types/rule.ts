import { Document } from 'mongoose';
import { EditableType } from '@react-page/core';

interface IRuleData {
    title: string;
    href: string;
    content: EditableType;
}

export interface IRule extends IRuleData {
    _id?: string;
}

export interface IRuleDocument extends IRuleData, Document {}

export interface IShortRule {
    title: IRule['title'];
    href: IRule['href'];
}

export type RulesData = Array<IRuleDocument>;
