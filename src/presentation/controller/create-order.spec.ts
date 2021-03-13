import { CreateOrderController } from './create-order'

describe('Create Order Controller', () => {
  test('Should return 400 if no products are provided', () => {
    const sut = new CreateOrderController()
    const httpRequest = {
      body: {}
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
