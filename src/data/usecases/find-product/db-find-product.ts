import { ProductModel } from '../../../domain/models/product'
import { FindProduct, FindProductModel } from '../../../domain/usecases/find-product'
import { ProductInexistentError } from '../../errors/produts-inexistent-error'
import { FindProductRepository } from '../../protocols/find-product-repository'

export class DbFindProduct implements FindProduct {
  private readonly findProductRepository: FindProductRepository

  constructor (findProductRepository: FindProductRepository) {
    this.findProductRepository = findProductRepository
  }

  async find (productData: FindProductModel): Promise<ProductModel> {
    const product = await this.findProductRepository.find(productData)
    if (product && Object.keys(product).length === 0 && product.constructor === Object) throw new ProductInexistentError(productData.name)

    return product
  }
}
