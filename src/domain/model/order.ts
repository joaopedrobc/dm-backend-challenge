import { OrderProductModel } from './order-product'

export interface OrderModel {
  id: string
  products: OrderProductModel[]
  total: number
}
