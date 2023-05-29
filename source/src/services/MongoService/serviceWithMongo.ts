import { Collection, Document } from 'mongodb'
import mongoService from '.'

type ServiceWithMongoParamsType = {
  collectionName: string
}

export class ServiceWithMongo<T extends Document = Document> {
  protected _collectionName: string
  protected _collection: Collection<T> | null = null

  protected get collection() {
    if (!this._collection) {
      this._collection = mongoService.getCollection<T>(this._collectionName)
    }
    return this._collection
  }

  constructor({ collectionName }: ServiceWithMongoParamsType) {
    this._collectionName = collectionName
  }
}
