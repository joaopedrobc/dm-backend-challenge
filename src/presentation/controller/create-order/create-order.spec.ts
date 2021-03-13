import { CreateOrderController } from './create-order'
import { InvalidParamError, MissingParamError } from '../../error'

const makeSut = (): CreateOrderController => {
  return new CreateOrderController()
}

describe('Create Order Controller', () => {
  test('Should return 400 if no products are provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('products'))
  })

  test('Should return 400 if products are provided but are empty', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        products: {}
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('products'))
  })
})
