import { Entity } from "../Entity";

export interface VocabularyItem extends Entity {
  word: string;
  translation: string;
  example?: string;
  id?: string;
  _id?: string;
}
