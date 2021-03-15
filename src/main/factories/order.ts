import { CreateOrderController } from '../../presentation/controllers/create-order/create-order'
import { DbCreateOrder } from '../../data/usecases/create-order/db-create-order'
import { OrderMongoRepository } from '../../infra/db/mongodb/order-repository/order'
import { ProductMongoRepository } from '../../infra/db/mongodb/product-repository/product'

export const makeCreateOrderController = (): CreateOrderController => {
  const orderMongoRepository = new OrderMongoRepository()
  const productMongoRepository = new ProductMongoRepository()
  const dbCreateOrder = new DbCreateOrder(orderMongoRepository, productMongoRepository, productMongoRepository)
  const createOrderController = new CreateOrderController(dbCreateOrder)
  return createOrderController
}
