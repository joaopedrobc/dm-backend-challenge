import { OrderModel } from '../../../domain/models/order'
import { CreateOrderModel } from '../../../domain/usecases/create-order'
import { CreateOrderRepository } from '../../protocols/create-order-repository'
import { DbCreateOrder } from './db-create-order'

const makeCreateOrderRepository = (): CreateOrderRepository => {
  class CreateOrderRepositoryStub implements CreateOrderRepository {
    async create (orderData: CreateOrderModel): Promise<OrderModel> {
      const fakeData = {
        id: 'valid_id',
        products: [
          {
            name: 'any_name',
            quantity: 0,
            price: 10
          }
        ],
        total: 10
      }
      return new Promise(resolve => resolve(fakeData))
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

  test('Should throw if CreateOrderRepository throws', async () => {
    const { sut, createOrderRepositoryStub } = makeSut()
    jest.spyOn(createOrderRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const orderData = {
      products: [
        {
          name: 'any_name',
          quantity: 0
        }
      ]
    }
    const promise = sut.create(orderData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an order on success', async () => {
    const { sut } = makeSut()
    const orderData = {
      products: [
        {
          name: 'any_name',
          quantity: 0
        }
      ]
    }
    const order = await sut.create(orderData)
    expect(order).toEqual({
      id: 'valid_id',
      products: [
        {
          name: 'any_name',
          quantity: 0,
          price: 10
        }
      ],
      total: 10
    })
  })
})
