import { Document } from 'mongoose';

export interface IVocabularyItem extends Document {
    word: string,
    translation: string,
    example: string | undefined,
}

export type IVocabulary = Array<IVocabularyItem>;
