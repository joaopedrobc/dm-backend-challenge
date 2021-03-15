import { OrderModel } from '../../../domain/models/order'
import { FindOrderModel, FindOrderRepository } from '../../protocols/find-order-repository'
import { DbFindOrder } from './db-find-order'

describe('DbFindOrder Usecase', () => {
  const makeFindOrderRepositoryStub = (): FindOrderRepository => {
    class FindOrderRepositoryStub implements FindOrderRepository {
      async find (productData: FindOrderModel): Promise<OrderModel[]> {
        return new Promise(resolve => resolve(null))
      }
    }

    return new FindOrderRepositoryStub()
  }

  interface SutType {
    sut: DbFindOrder
    findOrderRepositoryStub: FindOrderRepository
  }

  const makeSut = (): SutType => {
    const findOrderRepositoryStub = makeFindOrderRepositoryStub()
    const sut = new DbFindOrder(findOrderRepositoryStub)

    return {
      sut,
      findOrderRepositoryStub
    }
  }

  test('Should throw if FindOrderRepository throws', async () => {
    const { sut, findOrderRepositoryStub } = makeSut()
    jest.spyOn(findOrderRepositoryStub, 'find').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.find({})
    await expect(promise).rejects.toThrow()
  })
})
