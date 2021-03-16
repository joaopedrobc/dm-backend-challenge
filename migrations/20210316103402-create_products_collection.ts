import { Db, MongoClient } from 'mongodb'

export = {
  async up (db: Db, client: MongoClient) {
    await db.createCollection('products', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'quantity', 'price'],
          properties: {
            name: {
              bsonType: 'string'
            },
            quantity: {
              bsonType: 'number'
            },
            price: {
              bsonType: 'number'
            }
          }
        }
      }
    })
  },
  async down (db: Db, client: MongoClient) {
    await db.collection('products').drop()
  }
}
