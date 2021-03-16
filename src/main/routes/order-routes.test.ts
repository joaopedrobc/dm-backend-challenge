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
    const productCollection = await MongoHelper.getCollection('products')
    await productCollection.deleteMany({})
  })

  test('Should return an order on success', async () => {
    const productCollection = await MongoHelper.getCollection('products')
    await productCollection.insertOne({
      name: 'Kiwi',
      quantity: 10,
      price: 5.90
    })

    await request(app)
      .post('/orders')
      .send({
        products: [
          {
            name: 'Kiwi',
            quantity: 2
          }
        ]
      })
      .expect(200)
  })

  test('Should decrease product quantity on success', async () => {
    const productCollection = await MongoHelper.getCollection('products')
    await productCollection.insertOne({
      name: 'Kiwi',
      quantity: 10,
      price: 5.90
    })

    await request(app)
      .post('/orders')
      .send({
        products: [
          {
            name: 'Kiwi',
            quantity: 2
          }
        ]
      })
    const product = await productCollection.findOne({ name: 'Kiwi' })
    expect(product.quantity).toBe(8)
  })

  test('Should return orders on success /orders', async () => {
    const productCollection = await MongoHelper.getCollection('products')
    const orderCollection = await MongoHelper.getCollection('orders')
    await productCollection.insertOne({
      name: 'Kiwi',
      quantity: 10,
      price: 5.90
    })
    await orderCollection.insertOne({
      name: 'Kiwi',
      quantity: 2
    })
    await orderCollection.insertOne({
      name: 'Kiwi',
      quantity: 3
    })
    await request(app)
      .get('/orders')
      .expect(200)
  })

  test('Should return orders on success /orders/:orderId', async () => {
    const productCollection = await MongoHelper.getCollection('products')
    const orderCollection = await MongoHelper.getCollection('orders')
    await productCollection.insertOne({
      name: 'Kiwi',
      quantity: 10,
      price: 5.90
    })
    await orderCollection.insertOne({
      name: 'Kiwi',
      quantity: 2
    })
    const order = await orderCollection.insertOne({
      name: 'Kiwi',
      quantity: 3
    })
    const url: string = order.ops[0]._id
    await request(app)
      .get(`/orders/${url}`)
      .expect(200)
  })
})
