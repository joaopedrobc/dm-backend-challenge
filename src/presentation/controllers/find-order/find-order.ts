import { OrderInexistentError } from '../../../data/errors/order-inexistent-error'
import { OrderModel } from '../../../domain/models/order'
import { FindOrder } from '../../../domain/usecases/find-order'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
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
      if (params?.orderId) {
        const orderId = params.orderId
        orders = await this.findOrder.find({ id: orderId })
        return ok(orders[0])
      }

      orders = await this.findOrder.find({})
      return ok({ orders: orders })
    } catch (error) {
      if (error instanceof OrderInexistentError) return badRequest(error)
      return serverError()
    }
  }
}
