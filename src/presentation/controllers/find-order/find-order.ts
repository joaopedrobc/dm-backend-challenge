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
        return ok({ orders: orders })
      } else {
        orders = await this.findOrder.find({})
        let response = ok({})
        if (orders.length === 0) {
          response = ok(orders[0])
        }

        return response
      }
    } catch (error) {
      return serverError()
    }
  }
}
