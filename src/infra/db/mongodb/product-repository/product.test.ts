import { MongoHelper } from '../helpers/mongo-helper'
import { ProductMongoRepository } from './product'

describe('Product Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const orderCollection = await MongoHelper.getCollection('products')
    await orderCollection.deleteMany({})
  })

  const makeSut = (): ProductMongoRepository => {
    return new ProductMongoRepository()
  }

  test('Should return an product on success', async () => {
    const sut = makeSut()
    const orderCollection = await MongoHelper.getCollection('products')
    await orderCollection.insertOne({
      name: 'Kiwi',
      quantity: 10,
      price: 5.90
    })

    const product = await sut.find({ name: 'Kiwi' })
    expect(product).toBeTruthy()
    expect(product.name).toBe('Kiwi')
    expect(product.quantity).toBe(10)
    expect(product.price).toBe(5.90)
  })
})
