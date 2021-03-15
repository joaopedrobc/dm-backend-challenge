import { ListOrderModel } from '../models/list-order'

export interface FindOrderModel {
  id?: string
}

export interface FindOrder {
  find: (productData: FindOrderModel) => Promise<ListOrderModel>
}
