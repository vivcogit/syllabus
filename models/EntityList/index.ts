export interface Entity {
  _id?;
}

export interface EntitiesRepo<T extends Entity> {
  getAll(): Promise<Array<T>>;
  getById(id: T['_id']): Promise<T>;
  add(item: T): Promise<void>;
}
