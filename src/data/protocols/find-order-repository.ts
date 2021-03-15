import { ListOrderModel } from '../../domain/models/list-order'

export interface FindOrderModel {
  id?: string
}

export interface FindOrderRepository {
  find: (id: FindOrderModel) => Promise<ListOrderModel>
}
