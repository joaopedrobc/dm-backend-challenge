import { CreateOrderController } from './create-order'
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { CreateOrder, CreateOrderModel } from '../../../domain/usecase/create-order'
import { OrderModel } from '../../../domain/model/order'

const makeCreateOrder = (): CreateOrder => {
  class CreateOrderStub implements CreateOrder {
    async create (order: CreateOrderModel): Promise<OrderModel> {
      const fakeOrder = {
        id: 'valid_id',
        products: [
          {
            name: 'valid_product_name',
            quantity: 1,
            price: 10
          }
        ],
        total: 10
      }

      return new Promise(resolve => resolve(fakeOrder))
    }
  }

  return new CreateOrderStub()
}

interface SutType {
  sut: CreateOrderController
  createOrderStub: CreateOrder
}

const makeSut = (): SutType => {
  const createOrderStub = makeCreateOrder()
  const sut = new CreateOrderController(createOrderStub)

  return { sut, createOrderStub }
}

describe('Create Order Controller', () => {
  test('Should return 400 if no products are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('products'))
  })

  test('Should return 400 if products are provided but are empty', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        products: []
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('products'))
  })

  test('Should return 500 if CreateOrder throws', async () => {
    const { sut, createOrderStub } = makeSut()
    jest.spyOn(createOrderStub, 'create').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        products: [
          {
            name: 'any_name',
            quantity: 0
          }
        ]
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        products: [
          {
            name: 'any_name',
            quantity: 0
          }
        ]
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      products: [
        {
          name: 'valid_product_name',
          quantity: 1,
          price: 10
        }
      ],
      total: 10
    })
  })
})
