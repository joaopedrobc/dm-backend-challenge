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
    const productCollection = await MongoHelper.getCollection('products')
    await productCollection.insertOne({
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

  test('Should return an product with updated values after update success', async () => {
    const sut = makeSut()
    const productCollection = await MongoHelper.getCollection('products')
    await productCollection.insertOne({
      name: 'Kiwi',
      quantity: 10,
      price: 5.90
    })

    const product = await sut.update({ name: 'Kiwi' }, { name: 'Kiwi', quantity: 9, price: 5.90 })
    expect(product).toBeTruthy()
    expect(product.name).toBe('Kiwi')
    expect(product.quantity).toBe(9)
    expect(product.price).toBe(5.90)
  })

  test('Should updated values not add new document after update success', async () => {
    const sut = makeSut()
    const orderCollection = await MongoHelper.getCollection('products')
    await orderCollection.insertOne({
      name: 'Kiwi',
      quantity: 10,
      price: 5.90
    })

    const beforeUpdateResult = await orderCollection.find()
    expect((await beforeUpdateResult.toArray()).length).toBe(1)
    await sut.update({ name: 'Kiwi' }, { name: 'Kiwi', quantity: 9, price: 5.90 })
    const afterUpdateResult = await orderCollection.find()
    expect((await afterUpdateResult.toArray()).length).toBe(1)
  })

  test('Should returns empty object if MongoHelper map receives null', async () => {
    const sut = makeSut()
    const mapSpy = jest.spyOn(MongoHelper, 'mapWithoutId')
    await sut.find({ name: 'Kiwi' })
    expect(mapSpy).toReturnWith({})
  })
})
