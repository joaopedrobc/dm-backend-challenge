import { ProductModel } from '../../../domain/models/product'
import { FindProduct, FindProductModel } from '../../../domain/usecases/find-product'
import { FindProductRepository } from '../../protocols/find-product-repository'

export class DbFindProduct implements FindProduct {
  private readonly findProductRepository: FindProductRepository

  constructor (findProductRepository: FindProductRepository) {
    this.findProductRepository = findProductRepository
  }

  async find (productData: FindProductModel): Promise<ProductModel> {
    const product = await this.findProductRepository.find(productData)
    return product
  }
}
