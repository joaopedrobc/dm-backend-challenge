import { ProductModel } from '../../domain/models/product'
import { FindProductModel } from '../../domain/usecases/find-product'
import { UpdateProductModel } from '../../domain/usecases/update-product'

export interface UpdateProductRepository {
  update: (name: FindProductModel, productData: UpdateProductModel) => Promise<ProductModel>
}
