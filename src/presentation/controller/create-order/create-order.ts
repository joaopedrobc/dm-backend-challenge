import { MissingParamError } from '../../error'
import { Controller, HttpRequest, HttpResponse } from '../../protocol'

export class CreateOrderController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 400,
      body: new MissingParamError('products')
    }
  }
}
