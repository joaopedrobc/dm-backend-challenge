import { Db, MongoClient } from 'mongodb'
import csv from 'csvtojson'

export = {
  async up (db: Db, client: MongoClient) {
    const csvFilePath = './products.csv'
    const products = await csv().fromFile(csvFilePath)
    await db.collection('products').insertMany(products)
  },
  async down (db: Db, client: MongoClient) {
    await db.collection('products').deleteMany({})
  }
}
