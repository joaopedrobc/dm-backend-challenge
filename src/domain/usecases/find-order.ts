import { OrderModel } from '../models/order'

export interface FindOrderModel {
  id?: string
}

export interface FindOrder {
  find: (productData: FindOrderModel) => Promise<OrderModel[]>
}
