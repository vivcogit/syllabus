import { Document, Model } from 'mongoose';

export interface IVocabularyItemData {
    word: string;
    translation: string;
    example: string | undefined;
}

export interface IVocabularyItem extends IVocabularyItemData {
    _id?: string;
}

export interface IVocabularyItemDocument extends IVocabularyItemData, Document { }

export type IVocabularyItemModel = Model<IVocabularyItemDocument>

export type IVocabularyDocuments = Array<IVocabularyItemDocument>;

export type IVocabulary = Array<IVocabularyItem>;
