import { MissingParamError } from '../../error'

export class CreateOrderController {
  handle (httpRequest: any): any {
    return {
      statusCode: 400,
      body: new MissingParamError('products')
    }
  }
}
