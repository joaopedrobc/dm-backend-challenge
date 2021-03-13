import { MissingParamError } from '../../error'
import { HttpRequest, HttpResponse } from '../../protocol'

export class CreateOrderController {
  handle (httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: new MissingParamError('products')
    }
  }
}
