import { Db, MongoClient, Collection, Document } from 'mongodb'
import { IMongoService, MongoServiceParams } from './interface'

const MONGO_ERRORS = {
  MONGO_NOT_CONNECTED: "Mongo isn't connected",
  DB_NOT_CONNECTED: "Db isn't specified",
  FIND_ERROR: 'Cannot find data in database',
  INSERT_ERROR: 'Cannot insert data in database',
  UPDATE_ERROR: 'Cannot update data in database',
  DELETE_ERROR: 'Cannot delete data in database',
  GET_COLLECTION: 'Cannot get collection',
}

class MongoService implements IMongoService {
  url: string | undefined
  private _dbName: string
  private _client: MongoClient | null = null
  private _db: Db | null = null

  get db() {
    return this._db
  }

  get dbName() {
    return this._dbName
  }

  constructor({ dbName }: MongoServiceParams) {
    this._dbName = dbName
  }

  async connect(url: string, dbName?: string) {
    this.url = url
    try {
      this._client = await new MongoClient(this.url).connect()
      if (dbName) {
        this._dbName = dbName
      }
      this._db = this._client.db(this._dbName)
      return true
    } catch (e: any) {
      this._client = null
      console.error(e)
      return false
    }
  }

  async disconnect(): Promise<boolean> {
    if (this._client === null) {
      console.error('MongoDB already was disconnected')
      return true
    } else {
      try {
        await this._client.close()
        this._client = null
        this._db = null
        return true
      } catch (e: any) {
        console.error(e)
        return false
      }
    }
  }

  getErrorMsg(
    origin: 'find' | 'insert' | 'update' | 'delete' | 'collection',
    reason?: 'mongo-disconnected' | 'db-disconnected'
  ): string {
    let msg = 'Error: '

    switch (origin) {
      case 'find':
        msg += MONGO_ERRORS.FIND_ERROR
        break
      case 'insert':
        msg += MONGO_ERRORS.INSERT_ERROR
        break
      case 'update':
        msg += MONGO_ERRORS.UPDATE_ERROR
        break
      case 'delete':
        msg += MONGO_ERRORS.DELETE_ERROR
        break
      case 'collection':
        msg += MONGO_ERRORS.GET_COLLECTION
        break
      default:
        msg += origin
        break
    }

    if (reason) {
      msg += '. Reason: '
      if (reason === 'mongo-disconnected')
        msg += MONGO_ERRORS.MONGO_NOT_CONNECTED
      if (reason === 'db-disconnected') msg += MONGO_ERRORS.DB_NOT_CONNECTED
      else msg += reason
    }

    return msg
  }

  getCollection<T extends Document>(collectionName: string): Collection<T> {
    if (!this._client) {
      throw new Error(this.getErrorMsg('collection', 'mongo-disconnected'))
    }

    if (!this._db) {
      throw new Error(this.getErrorMsg('collection', 'db-disconnected'))
    }

    return this._db.collection<T>(collectionName)
  }
}

const mongoService = new MongoService({
  dbName: 'test',
})

export default mongoService
