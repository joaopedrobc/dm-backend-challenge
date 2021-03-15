import { OrderModel } from '../../../domain/models/order'
import { FindOrder, FindOrderModel } from '../../../domain/usecases/find-order'
import { ServerError } from '../../errors'
import { FindOrderController } from './find-order'

const makeFindOrder = (): FindOrder => {
  class FindOrderStub implements FindOrder {
    async find (productData: FindOrderModel): Promise<OrderModel[]> {
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

  test('Should call FindOrder with correct values', async () => {

  })

  // test('Should return 200 if valid data is provided', async () => {
  //   const { sut } = makeSut()
  //   sut.find()
  // })
})
