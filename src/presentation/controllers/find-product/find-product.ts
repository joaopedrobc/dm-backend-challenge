import { ProductInexistentError } from '../../../data/errors/produts-inexistent-error'
import { FindProduct } from '../../../domain/usecases/find-product'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class FindProductController implements Controller {
  private readonly findProduct: FindProduct

  constructor (findProduct: FindProduct) {
    this.findProduct = findProduct
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { params } = httpRequest
      const name = params.name
      const product = await this.findProduct.find({ name: name })
      return ok(product)
    } catch (error) {
      if (error instanceof ProductInexistentError) {
        return badRequest(error)
      }

      return serverError()
    }
  }
}
