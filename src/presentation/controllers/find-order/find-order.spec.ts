import { ListOrderModel } from '../../../domain/models/list-order'
import { FindOrder, FindOrderModel } from '../../../domain/usecases/find-order'
import { ServerError } from '../../errors'
import { FindOrderController } from './find-order'

const makeFindOrder = (): FindOrder => {
  class FindOrderStub implements FindOrder {
    async find (id: FindOrderModel): Promise<ListOrderModel> {
      return new Promise(resolve => resolve(null))
    }
  }

  return new FindOrderStub()
}

interface SutType {
  sut: FindOrderController
  findOrderStub: FindOrder
}

const makeSut = (): SutType => {
  const findOrderStub = makeFindOrder()
  const sut = new FindOrderController(findOrderStub)

  return { sut, findOrderStub }
}

describe('Find Order Controller', () => {
  test('Should return 500 if FindOrder throws', async () => {
    const { sut, findOrderStub } = makeSut()
    jest.spyOn(findOrderStub, 'find').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {}
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call FindOrder with orderId if params exists', async () => {
    const { sut, findOrderStub } = makeSut()
    const findSpy = jest.spyOn(findOrderStub, 'find')
    const httpRequest = {
      params: {
        orderId: 'any_order_id'
      }
    }
    await sut.handle(httpRequest)

    expect(findSpy).toHaveBeenCalledWith({ id: 'any_order_id' })
  })

  test('Should call FindOrder with empty id if params not exists', async () => {
    const { sut, findOrderStub } = makeSut()
    const findSpy = jest.spyOn(findOrderStub, 'find')
    const httpRequest = {}
    await sut.handle(httpRequest)

    expect(findSpy).toHaveBeenCalledWith({})
  })

  test('Should return 200 if no params are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('Should return 200 if param orderId is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        orderId: 'any_order_id'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('Should return 200 if param orderId is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        orderId: 'any_order_id'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
