import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { CreateOrder } from '../../../domain/usecases/create-order'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { ProductsNoStockError } from '../../../data/errors/products-no-stock-error'
import { ProductInexistentError } from '../../../data/errors/produts-inexistent-error'

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
      if (error instanceof ProductsNoStockError) return badRequest(error)
      if (error instanceof ProductInexistentError) return badRequest(error)
      return serverError()
    }
  }
}
