import { ListOrderModel } from '../../../domain/models/list-order'
import { FindOrder, FindOrderModel } from '../../../domain/usecases/find-order'
import { FindOrderRepository } from '../../protocols/find-order-repository'

export class DbFindOrder implements FindOrder {
  private readonly findOrderRepository: FindOrderRepository

  constructor (findOrderRepository: FindOrderRepository) {
    this.findOrderRepository = findOrderRepository
  }

  async find (id: FindOrderModel): Promise<ListOrderModel> {
    const orders = await this.findOrderRepository.find(id)
    return orders
  }
}
