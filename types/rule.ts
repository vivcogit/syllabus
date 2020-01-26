import { Document } from 'mongoose';
import { EditableType } from '@react-page/core';

export interface IRule extends Document {
    title: string;
    href: string;
    content: EditableType;
}

export type IShortRule = {
    title: IRule['title'],
    href: IRule['href'],
};

export type RulesData = Array<IRule>;
