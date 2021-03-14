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
    const productsPromise: Array<Promise<ProductModel>> = []
    let productsFromStock: ProductModel[] = []

    products.forEach(async product => {
      productsPromise.push(this.findProductRepository.find({ name: product.name }))
    })

    await Promise.all(productsPromise).then((products) => {
      productsFromStock = products
    })

    const productsInStock = productsFromStock.filter(product => product.quantity > 0).map(product => ({ name: product.name, quantity: product.quantity }))
    const order = await this.createOrderRepository.create(Object.assign({}, orderData, { products: productsInStock }))
    return order
  }
}
