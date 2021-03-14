import { OrderModel } from '../../../domain/models/order'
import { ProductModel } from '../../../domain/models/product'
import { CreateOrder, CreateOrderModel } from '../../../domain/usecases/create-order'
import { CreateOrderRepository } from '../../protocols/create-order-repository'
import { FindProductRepository } from '../../protocols/find-product-repository'

export class DbCreateOrder implements CreateOrder {
  private readonly createOrderRepository: CreateOrderRepository
  private readonly findProductRepository: FindProductRepository

  constructor (createOrderRepository: CreateOrderRepository, findProductRepository: FindProductRepository) {
    this.createOrderRepository = createOrderRepository
    this.findProductRepository = findProductRepository
  }

  async create (orderData: CreateOrderModel): Promise<OrderModel> {
    const { products } = orderData
    const productsFromStock: ProductModel[] = []

    products.forEach(async product => {
      productsFromStock.push(await this.findProductRepository.find({ name: product.name }))
    })

    const order = await this.createOrderRepository.create(orderData)
    return order
  }
}
