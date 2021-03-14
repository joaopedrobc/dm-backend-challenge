import { OrderModel } from '../../../domain/models/order'
import { CreateOrderModel } from '../../../domain/usecases/create-order'
import { CreateOrderRepository } from '../../protocols/create-order-repository'
import { DbCreateOrder } from './db-create-order'

const makeCreateOrderRepository = (): CreateOrderRepository => {
  class CreateOrderRepositoryStub implements CreateOrderRepository {
    async create (orderData: CreateOrderModel): Promise<OrderModel> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new CreateOrderRepositoryStub()
}

interface SutType {
  sut: DbCreateOrder
  createOrderRepositoryStub: CreateOrderRepository
}

const makeSut = (): SutType => {
  const createOrderRepositoryStub = makeCreateOrderRepository()
  const sut = new DbCreateOrder(createOrderRepositoryStub)
  return {
    sut,
    createOrderRepositoryStub
  }
}

describe('DbCreateOrder Usecase', () => {
  test('Should call CreateOrderRepository with correct values', async () => {
    const { sut, createOrderRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(createOrderRepositoryStub, 'create')
    const orderData = {
      products: [
        {
          name: 'any_name',
          quantity: 0
        }
      ]
    }
    await sut.create(orderData)
    expect(createSpy).toHaveBeenCalledWith({
      products: [
        {
          name: 'any_name',
          quantity: 0
        }
      ]
    })
  })
})
