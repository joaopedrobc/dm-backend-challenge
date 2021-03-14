import { ProductModel } from './product'

export interface OrderModel {
  id: string
  products: ProductModel[]
  total: number
}
