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
    const orderCollection = await MongoHelper.getCollection('orders')
    await orderCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/orders')
      .send({
        products: [
          {
            name: 'Kiwi',
            quantity: 1
          }
        ]
      })
      .expect(200)
  })
})
