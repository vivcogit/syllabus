export interface Entity {
  id?;
}

export interface EntitiesRepo<T extends Entity> {
  getAll(): Promise<Array<T>>;
  getById(id: T['id']): Promise<T>;
  add(item: T): Promise<void>;
}
