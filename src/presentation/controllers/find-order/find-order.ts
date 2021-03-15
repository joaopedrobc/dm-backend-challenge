import { OrderModel } from '../../../domain/models/order'
import { FindOrder } from '../../../domain/usecases/find-order'
import { ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class FindOrderController implements Controller {
  private readonly findOrder: FindOrder

  constructor (findOrder: FindOrder) {
    this.findOrder = findOrder
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    let orders: OrderModel[]
    try {
      const { params } = httpRequest
      if (params) {
        const orderId = params.orderId
        orders = await this.findOrder.find({ id: orderId })
      } else {
        orders = await this.findOrder.find({})
      }
    } catch (error) {
      return serverError()
    }
    return ok(orders)
  }
}
