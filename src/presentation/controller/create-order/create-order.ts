import { InvalidParamError, MissingParamError } from '../../error'
import { Controller, HttpRequest, HttpResponse } from '../../protocol'
import { badRequest, ok } from '../../helper/http-helper'

export class CreateOrderController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
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

    return ok({})
  }
}
