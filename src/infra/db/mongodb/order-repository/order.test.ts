import { MongoHelper } from '../helpers/mongo-helper'
import { OrderMongoRepository } from './order'

describe('Order Mongo Repository', () => {
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

  test('Should return an order on success', async () => {
    const sut = new OrderMongoRepository()
    const order = await sut.create({
      products: [
        {
          name: 'Kiwi',
          quantity: 2,
          price: 9.71
        }
      ],
      total: 19.42
    })
    expect(order).toBeTruthy()
    expect(order.id).toBeTruthy()
    expect(order.products).toBeTruthy()
    expect(order.products.length).toBe(1)
    expect(order.total).toBeTruthy()
    expect(order.total).toBe(19.42)
  })
})
