import { OrderModel } from '../model/order'

export interface CreateOrderModel {
  products: CreateOrderProductModel[]
}

export interface CreateOrderProductModel {
  name: string
  quantity: number
}

export interface CreateOrder {
  create: (order: CreateOrderModel) => Promise<OrderModel>
}
