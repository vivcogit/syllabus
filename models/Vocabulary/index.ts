import { Entity } from "../EntityList";

export class VocabularyItem implements Entity {
  word: string;
  translation: string;
  example?: string;
  _id?: string;

  constructor(word: string, translation: string, example?: string) {
    this.word = word;
    this.translation = translation;
    this.example = example;
  }
}
