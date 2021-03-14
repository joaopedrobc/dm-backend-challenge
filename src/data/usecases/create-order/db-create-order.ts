import { OrderModel } from '../../../domain/models/order'
import { ProductModel } from '../../../domain/models/product'
import { CreateOrder, CreateOrderModel } from '../../../domain/usecases/create-order'
import { CreateOrderRepository } from '../../protocols/create-order-repository'
import { FindProductRepository } from '../../protocols/find-product-repository'
import { UpdateProductRepository } from '../../protocols/update-protocol-repository'

export class DbCreateOrder implements CreateOrder {
  private readonly createOrderRepository: CreateOrderRepository
  private readonly findProductRepository: FindProductRepository
  private readonly updateProductRepositoryStub: UpdateProductRepository

  constructor (createOrderRepository: CreateOrderRepository, findProductRepository: FindProductRepository, updateProductRepositoryStub: UpdateProductRepository) {
    this.createOrderRepository = createOrderRepository
    this.findProductRepository = findProductRepository
    this.updateProductRepositoryStub = updateProductRepositoryStub
  }

  async create (orderData: CreateOrderModel): Promise<OrderModel> {
    const { products } = orderData
    const productPromises: Array<Promise<ProductModel>> = []
    let productsFromStock: ProductModel[] = []

    products.forEach(async product => {
      productPromises.push(this.findProductRepository.find({ name: product.name }))
    })

    await Promise.all(productPromises).then((products) => {
      productsFromStock = products
    })

    const productsInStock = productsFromStock.filter(product => product.quantity > 0)
    const order = await this.createOrderRepository.create(Object.assign({}, orderData, { products: productsInStock.map(product => ({ name: product.name, quantity: product.quantity })) }))
    if (order) {
      const updatePromises: Array<Promise<ProductModel>> = []
      productsFromStock.forEach(async product => {
        updatePromises.push(this.updateProductRepositoryStub.update(product.id, product))
      })
    }
    await Promise.all(productPromises)

    return order
  }
}
