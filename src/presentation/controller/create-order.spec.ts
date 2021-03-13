import { CreateOrderController } from './create-order'
import { MissingParamError } from './error'

describe('Create Order Controller', () => {
  test('Should return 400 if no products are provided', () => {
    const sut = new CreateOrderController()
    const httpRequest = {
      body: {}
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('products'))
  })
})
