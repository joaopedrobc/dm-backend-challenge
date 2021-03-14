import { OrderModel } from '../../domain/models/order'
import { CreateOrderModel } from '../../domain/usecases/create-order'

export interface CreateOrderRepository {
  create: (orderData: CreateOrderModel) => Promise<OrderModel>
}
