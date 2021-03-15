import { OrderModel } from '../../domain/models/order'

export interface FindOrderModel {
  id?: string
}

export interface FindOrderRepository {
  find: (id: FindOrderModel) => Promise<OrderModel[]>
}
