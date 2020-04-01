import { VocabularyItem } from "../index";
import { EntitiesRepo } from "../../Entity";
import apiProvider from "../../../providers/api";

export class ClientVocabularyRepo implements EntitiesRepo<VocabularyItem> {
  async getAll(): Promise<VocabularyItem[]> {
    return await apiProvider.getVocabulary();
  }

  getById(): Promise<VocabularyItem> {
    throw new Error("Method not implemented.");
  }

  async add(item: VocabularyItem): Promise<any> {
    return await apiProvider.postVocabularyItem(item);
  }
}
