import { OrderModel } from '../../../domain/models/order'
import { FindOrder, FindOrderModel } from '../../../domain/usecases/find-order'
import { OrderInexistentError } from '../../errors/order-inexistent-error'
import { FindOrderRepository } from '../../protocols/find-order-repository'

export class DbFindOrder implements FindOrder {
  private readonly findOrderRepository: FindOrderRepository

  constructor (findOrderRepository: FindOrderRepository) {
    this.findOrderRepository = findOrderRepository
  }

  async find (order: FindOrderModel): Promise<OrderModel[]> {
    const orders = await this.findOrderRepository.find(order)
    if (Object.keys(orders[0]).length === 0) {
      throw new OrderInexistentError(order.id)
    }
    return orders
  }
}
