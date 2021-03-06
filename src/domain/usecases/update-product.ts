import { ProductModel } from '../models/product'

export interface UpdateProductModel {
  name: string
  quantity: number
  price: number
}

export interface UpdateProduct {
  update: (name: string, productData: UpdateProductModel) => Promise<ProductModel>
}
