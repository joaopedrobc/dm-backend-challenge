import { OrderModel } from '../../../domain/models/order'
import { ProductModel } from '../../../domain/models/product'
import { CreateOrderModel } from '../../../domain/usecases/create-order'
import { FindProductModel } from '../../../domain/usecases/find-product'
import { UpdateProductModel } from '../../../domain/usecases/update-product'
import { CreateOrderRepository } from '../../protocols/create-order-repository'
import { FindProductRepository } from '../../protocols/find-product-repository'
import { UpdateProductRepository } from '../../protocols/update-protocol-repository'
import { DbCreateOrder } from './db-create-order'

const makeCreateOrderRepository = (): CreateOrderRepository => {
  class CreateOrderRepositoryStub implements CreateOrderRepository {
    async create (orderData: CreateOrderModel): Promise<OrderModel> {
      const fakeData = {
        id: 'valid_id',
        products: [
          {
            id: 'any_id',
            name: 'any_name',
            quantity: 0,
            price: 10
          },
          {
            id: 'any_id',
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

const makeFindProductRepository = (): FindProductRepository => {
  class FindProductRepositoryStub implements FindProductRepository {
    async find (productData: FindProductModel): Promise<ProductModel> {
      const fakeProduct = {
        id: 'any_id',
        name: 'any_name',
        quantity: 1,
        price: 10
      }
      return new Promise(resolve => resolve(fakeProduct))
    }
  }

  return new FindProductRepositoryStub()
}

const makeUpdateProductRepository = (): UpdateProductRepository => {
  class UpdateProductRepositoryStub implements UpdateProductRepository {
    async update (id: string, productData: UpdateProductModel): Promise<ProductModel> {
      const fakeProduct = {
        id: 'any_id',
        name: 'any_name',
        quantity: 1,
        price: 10
      }
      return new Promise(resolve => resolve(fakeProduct))
    }
  }

  return new UpdateProductRepositoryStub()
}

interface SutType {
  sut: DbCreateOrder
  createOrderRepositoryStub: CreateOrderRepository
  findProductRepositoryStub: FindProductRepository
  updateProductRepositoryStub: UpdateProductRepository
}

const makeSut = (): SutType => {
  const createOrderRepositoryStub: CreateOrderRepository = makeCreateOrderRepository()
  const findProductRepositoryStub: FindProductRepository = makeFindProductRepository()
  const updateProductRepositoryStub: UpdateProductRepository = makeUpdateProductRepository()
  const sut = new DbCreateOrder(createOrderRepositoryStub, findProductRepositoryStub, updateProductRepositoryStub)
  return {
    sut,
    createOrderRepositoryStub,
    findProductRepositoryStub,
    updateProductRepositoryStub
  }
}

const makeFakeOrder = (): CreateOrderModel => ({
  products: [
    {
      name: 'any_name',
      quantity: 1
    },
    {
      name: 'any_name',
      quantity: 1
    }
  ]
})

describe('DbCreateOrder Usecase', () => {
  test('Should call CreateOrderRepository with correct values', async () => {
    const { sut, createOrderRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(createOrderRepositoryStub, 'create')
    const orderData = makeFakeOrder()
    await sut.create(orderData)
    expect(createSpy).toHaveBeenCalledWith(orderData)
  })

  test('Should throw if CreateOrderRepository throws', async () => {
    const { sut, createOrderRepositoryStub } = makeSut()
    jest.spyOn(createOrderRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const orderData = makeFakeOrder()
    const promise = sut.create(orderData)
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if FindProductRepository throws', async () => {
    const { sut, findProductRepositoryStub } = makeSut()
    jest.spyOn(findProductRepositoryStub, 'find').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const orderData = makeFakeOrder()
    const promise = sut.create(orderData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call CreateOrderRepository only with products in stock', async () => {
    const { sut, findProductRepositoryStub, createOrderRepositoryStub } = makeSut()
    jest.spyOn(findProductRepositoryStub, 'find').mockReturnValueOnce(new Promise(resolve => resolve({
      id: 'any_id',
      name: 'any_name',
      quantity: 0,
      price: 10
    })))
    const createSpy = jest.spyOn(createOrderRepositoryStub, 'create')
    const orderData = makeFakeOrder()
    await sut.create(orderData)
    expect(createSpy).toHaveBeenCalledWith({
      products: [
        {
          name: 'any_name',
          quantity: 1
        }
      ]
    })
  })

  test('Should return an order on success', async () => {
    const { sut } = makeSut()
    const orderData = makeFakeOrder()
    const order = await sut.create(orderData)
    expect(order).toEqual({
      id: 'valid_id',
      products: [
        {
          id: 'any_id',
          name: 'any_name',
          quantity: 0,
          price: 10
        },
        {
          id: 'any_id',
          name: 'any_name',
          quantity: 0,
          price: 10
        }
      ],
      total: 10
    })
  })

  test('Should call UpdateProductRepository when an order is created with success', async () => {
    const { sut, updateProductRepositoryStub } = makeSut()
    const orderData = makeFakeOrder()
    const updateSpy = jest.spyOn(updateProductRepositoryStub, 'update')
    await sut.create(orderData)
    expect(updateSpy).toBeCalledTimes(2)
  })

  test('Should throw if UpdateProductRepository throws', async () => {
    const { sut, updateProductRepositoryStub } = makeSut()
    jest.spyOn(updateProductRepositoryStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const orderData = makeFakeOrder()
    const promise = sut.create(orderData)
    await expect(promise).rejects.toThrow()
  })
})
