import { ProductModel } from '../../../domain/models/product'
import { FindProductModel } from '../../../domain/usecases/find-product'
import { FindProductRepository } from '../../protocols/find-product-repository'
import { DbFindProduct } from './db-find-product'

describe('DbFindProduct Usecase', () => {
  const makeFindProductRepositoryStub = (): FindProductRepository => {
    class FindProductRepositoryStub implements FindProductRepository {
      async find (productData: FindProductModel): Promise<ProductModel> {
        return new Promise(resolve => resolve(null))
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
})
