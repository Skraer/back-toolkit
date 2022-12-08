import { ObjectId } from 'mongodb'

export default interface IMongoDoc {
  _id: ObjectId
}
