import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Order Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const productCollection = await MongoHelper.getCollection('products')
    await productCollection.deleteMany({})
  })

  test('Should return an product on success', async () => {
    const productCollection = await MongoHelper.getCollection('products')
    await productCollection.insertOne({
      name: 'Kiwi',
      quantity: 10,
      price: 5.90
    })

    await request(app)
      .get('/products/Kiwi')
      .expect(200)
  })
})
