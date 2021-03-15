import { ProductModel } from '../models/product'

export interface FindProductModel {
  name: string
}

export interface FindProduct {
  find: (productData: FindProductModel) => Promise<ProductModel>
}
