import { OrderModel } from '../../../domain/models/order'
import { ProductModel } from '../../../domain/models/product'
import { CreateOrder, CreateOrderModel, CreateOrderProductModel } from '../../../domain/usecases/create-order'
import { CreateFullOrderModel, CreateFullOrderProductModel, CreateOrderRepository } from '../../protocols/create-order-repository'
import { FindProductRepository } from '../../protocols/find-product-repository'
import { UpdateProductRepository } from '../../protocols/update-product-repository'

export class DbCreateOrder implements CreateOrder {
  private readonly createOrderRepository: CreateOrderRepository
  private readonly findProductRepository: FindProductRepository
  private readonly updateProductRepository: UpdateProductRepository

  constructor (createOrderRepository: CreateOrderRepository, findProductRepository: FindProductRepository, updateProductRepository: UpdateProductRepository) {
    this.createOrderRepository = createOrderRepository
    this.findProductRepository = findProductRepository
    this.updateProductRepository = updateProductRepository
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

    const productsInStockAvaliableForOrder = productsFromStock.filter(productInStock => productInStock.quantity >= products.filter(product => product.name === productInStock.name)[0].quantity)
    const productsForOrder: CreateFullOrderProductModel[] = productsInStockAvaliableForOrder.map(product => {
      const forOrder: CreateOrderProductModel = products.filter(productFromOrder => productFromOrder.name === product.name)[0]
      return {
        name: product.name,
        quantity: forOrder.quantity,
        price: product.price
      }
    })

    let total = 0
    productsForOrder.forEach(product => {
      total += product.price * product.quantity
      total = Number(total.toFixed(2))
    })

    let order = null
    if (productsForOrder.length > 0) {
      const orderToCreate: CreateFullOrderModel = {
        products: productsForOrder,
        total
      }

      order = await this.createOrderRepository.create(orderToCreate)

      if (order) {
        const updatePromises: Array<Promise<ProductModel>> = []
        productsForOrder.forEach(async product => {
          const inStock = productsInStockAvaliableForOrder.filter(productInStock => productInStock.name === product.name)[0]
          const { quantity, ...rest } = product
          const updatedQuantityProduct = Object.assign({}, rest, { quantity: inStock.quantity - product.quantity })
          updatePromises.push(this.updateProductRepository.update({ name: product.name }, updatedQuantityProduct))
        })
        await Promise.all(updatePromises)
      }
    }

    return order
  }
}
