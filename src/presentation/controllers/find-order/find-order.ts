import { FindOrder } from '../../../domain/usecases/find-order'
import { serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class FindOrderController implements Controller {
  private readonly findOrder: FindOrder

  constructor (findOrder: FindOrder) {
    this.findOrder = findOrder
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { params } = httpRequest
      if (params) {
        const orderId = params.orderId
        await this.findOrder.find({ id: orderId })
      } else {
        await this.findOrder.find({})
      }
    } catch (error) {
      return serverError()
    }
    return new Promise(resolve => resolve(null))
  }
}
