import { OrderModel } from '../../domain/models/order'

export interface CreateFullOrderModel {
  products: CreateFullOrderProductModel[]
  total: number
}

export interface CreateFullOrderProductModel {
  name: string
  price: number
  quantity: number
}

export interface CreateOrderRepository {
  create: (orderData: CreateFullOrderModel) => Promise<OrderModel>
}
