import { Collection } from 'mongodb'

export type MongoServiceParams = {
  dbName: string
}

export interface IMongoService {
  connect(url: string, dbName?: string): Promise<boolean>
  disconnect(): Promise<boolean>
  getCollection(collectionName: string): Collection
  getErrorMsg(origin: string, reason?: string): string
}
