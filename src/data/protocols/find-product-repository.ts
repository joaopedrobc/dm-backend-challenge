import { ProductModel } from '../../domain/models/product'
import { FindProductModel } from '../../domain/usecases/find-product'

export interface FindProductRepository {
  find: (productData: FindProductModel) => Promise<ProductModel>
}
