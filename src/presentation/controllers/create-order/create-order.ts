import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { CreateOrder } from '../../../domain/usecases/create-order'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreateOrderController implements Controller {
  private readonly createOrder: CreateOrder

  constructor (createOrder: CreateOrder) {
    this.createOrder = createOrder
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest

      console.log(body)

      const requiredFields = ['products']
      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { products } = body
      if (products && Object.keys(products).length === 0) {
        return badRequest(new InvalidParamError('products'))
      }
      console.log(products)

      const order = await this.createOrder.create(body)
      console.log(order)
      return ok(order)
    } catch (error) {
      return serverError()
    }
  }
}
