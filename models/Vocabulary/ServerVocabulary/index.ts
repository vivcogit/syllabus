import { VocabularyItem } from "../index";
import { EntitiesRepo } from "../../EntityList";
import dbProvider from "../../../providers/database";

export class ServerVocabularyRepo implements EntitiesRepo<VocabularyItem> {
  async getAll(): Promise<VocabularyItem[]> {
    return await dbProvider.getVocabulary();
  }

  getById(): Promise<VocabularyItem> {
    throw new Error("Method not implemented.");
  }

  async add(item: VocabularyItem): Promise<any> {
    return await dbProvider.insertVocabularyItem(item);
  }
}
