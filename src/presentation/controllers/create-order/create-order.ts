import { InvalidParamError, MissingParamError } from '../../errors'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { CreateOrder } from '../../../domain/usecase/create-order'

export class CreateOrderController implements Controller {
  private readonly createOrder: CreateOrder

  constructor (createOrder: CreateOrder) {
    this.createOrder = createOrder
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest

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

      const order = await this.createOrder.create(body)
      return ok(order)
    } catch (error) {
      return serverError()
    }
  }
}
