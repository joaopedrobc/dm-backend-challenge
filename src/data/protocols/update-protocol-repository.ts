import { ProductModel } from '../../domain/models/product'
import { UpdateProductModel } from '../../domain/usecases/update-product'

export interface UpdateProductRepository {
  update: (id: string, productData: UpdateProductModel) => Promise<ProductModel>
}
