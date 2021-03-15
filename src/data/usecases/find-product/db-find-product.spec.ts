import { ProductModel } from '../../../domain/models/product'
import { FindProductModel } from '../../../domain/usecases/find-product'
import { FindProductRepository } from '../../protocols/find-product-repository'
import { DbFindProduct } from './db-find-product'

describe('DbFindProduct Usecase', () => {
  const makeFindProductRepositoryStub = (): FindProductRepository => {
    class FindProductRepositoryStub implements FindProductRepository {
      async find (productData: FindProductModel): Promise<ProductModel> {
        const fakeData = {
          name: 'Kiwi',
          quantity: 1,
          price: 10
        }
        return new Promise(resolve => resolve(fakeData))
      }
    }

    return new FindProductRepositoryStub()
  }

  interface SutType {
    sut: DbFindProduct
    findProductRepositoryStub: FindProductRepository
  }

  const makeSut = (): SutType => {
    const findProductRepositoryStub = makeFindProductRepositoryStub()
    const sut = new DbFindProduct(findProductRepositoryStub)

    return {
      sut,
      findProductRepositoryStub
    }
  }

  test('Should throw if FindProductRepository throws', async () => {
    const { sut, findProductRepositoryStub } = makeSut()
    jest.spyOn(findProductRepositoryStub, 'find').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.find({ name: 'Kiwi' })
    await expect(promise).rejects.toThrow()
  })

  test('Should return an product on success', async () => {
    const { sut } = makeSut()
    const order = await sut.find({ name: 'Kiwi' })
    expect(order).toEqual({
      name: 'Kiwi',
      quantity: 1,
      price: 10
    })
  })
})
