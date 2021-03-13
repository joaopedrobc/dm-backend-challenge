import { CreateOrderController } from './create-order'
import { MissingParamError } from '../../error'

const makeSut = (): CreateOrderController => {
  return new CreateOrderController()
}

describe('Create Order Controller', () => {
  test('Should return 400 if no products are provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('products'))
  })
})
