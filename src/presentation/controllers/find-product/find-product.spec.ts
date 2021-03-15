import { ProductModel } from '../../../domain/models/product'
import { FindProduct, FindProductModel } from '../../../domain/usecases/find-product'
import { ServerError } from '../../errors'
import { FindProductController } from './find-product'

const makeFindProduct = (): FindProduct => {
  class FindProductStub implements FindProduct {
    async find (id: FindProductModel): Promise<ProductModel> {
      return new Promise(resolve => resolve(null))
    }
  }

  return new FindProductStub()
}

interface SutType {
  sut: FindProductController
  findProductStub: FindProduct
}

const makeSut = (): SutType => {
  const findProductStub = makeFindProduct()
  const sut = new FindProductController(findProductStub)

  return { sut, findProductStub }
}

describe('Find Product Controller', () => {
  test('Should return 500 if FindProduct throws', async () => {
    const { sut, findProductStub } = makeSut()
    jest.spyOn(findProductStub, 'find').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {}
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call FindProduct with name', async () => {
    const { sut, findProductStub } = makeSut()
    const findSpy = jest.spyOn(findProductStub, 'find')
    const httpRequest = {
      params: {
        name: 'any_order_id'
      }
    }
    await sut.handle(httpRequest)

    expect(findSpy).toHaveBeenCalledWith({ name: 'any_order_id' })
  })

  test('Should return 200 if success', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        name: 'any_order_id'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
