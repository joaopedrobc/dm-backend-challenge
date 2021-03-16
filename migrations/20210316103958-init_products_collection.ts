import { Db, MongoClient } from 'mongodb'
import csv from 'csvtojson'

export = {
  async up (db: Db, client: MongoClient) {
    const csvFilePath = './products.csv'
    const products = await csv().fromFile(csvFilePath)
    const productsToStore = products.map(product => ({
      name: product.name,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity)
    }))
    await db.collection('products').insertMany(productsToStore)
  },
  async down (db: Db, client: MongoClient) {
    await db.collection('products').deleteMany({})
  }
}
