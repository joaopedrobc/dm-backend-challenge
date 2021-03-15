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

  const makeSut = (): OrderMongoRepository => {
    return new OrderMongoRepository()
  }

  test('Should return an order on success', async () => {
    const sut = makeSut()
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

  test('Should return orders on success', async () => {
    const sut = makeSut()
    await sut.create({
      products: [
        {
          name: 'Kiwi',
          quantity: 2,
          price: 9.71
        },
        {
          name: 'Orange',
          quantity: 3,
          price: 2.71
        }
      ],
      total: 27.55
    })
    const result = await sut.find({})
    expect(result.orders).toBeTruthy()
    expect(result.orders.length).toBe(1)
    expect(result.orders[0].products.length).toBe(2)
  })
})
