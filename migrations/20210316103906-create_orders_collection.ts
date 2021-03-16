import { Db, MongoClient } from 'mongodb'

export = {
  async up (db: Db, client: MongoClient) {
    await db.createCollection('orders', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['products', 'total'],
          properties: {
            products: {
              bsonType: 'array'
            },
            total: {
              bsonType: 'number'
            }
          }
        }
      }
    })
  },
  async down (db: Db, client: MongoClient) {
    await db.collection('orders').drop()
  }
}
