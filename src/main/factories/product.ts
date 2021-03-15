import { DbFindProduct } from '../../data/usecases/find-product/db-find-product'
import { ProductMongoRepository } from '../../infra/db/mongodb/product-repository/product'
import { FindProductController } from '../../presentation/controllers/find-product/find-product'

export const makeFindProductController = (): FindProductController => {
  const productMongoRepository = new ProductMongoRepository()
  const dbFindProduct = new DbFindProduct(productMongoRepository)
  const findProductController = new FindProductController(dbFindProduct)
  return findProductController
}
