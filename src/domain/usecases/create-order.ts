import { OrderModel } from '../models/order'

export interface CreateOrderModel {
  products: CreateOrderProductModel[]
}

export interface CreateOrderProductModel {
  name: string
  quantity: number
}

export interface CreateOrder {
  create: (orderData: CreateOrderModel) => Promise<OrderModel>
}
