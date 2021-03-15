import { OrderModel } from '../../../domain/models/order'
import { FindOrderModel, FindOrderRepository } from '../../protocols/find-order-repository'
import { DbFindOrder } from './db-find-order'

describe('DbFindOrder Usecase', () => {
  const makeFindOrderRepositoryStub = (): FindOrderRepository => {
    class FindOrderRepositoryStub implements FindOrderRepository {
      async find (id: FindOrderModel): Promise<OrderModel[]> {
        const fakeData: OrderModel[] = [
          {
            id: 'any_id',
            products: [
              {
                name: 'Watermelon',
                quantity: 2,
                price: 5.47
              }
            ],
            total: 10.94
          }
        ]
        return new Promise(resolve => resolve(fakeData))
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

  test('Should return orders on success', async () => {
    const { sut } = makeSut()
    const order = await sut.find({})
    expect(order).toEqual([
      {
        id: 'any_id',
        products: [
          {
            name: 'Watermelon',
            quantity: 2,
            price: 5.47
          }
        ],
        total: 10.94
      }
    ]
    )
  })
})
