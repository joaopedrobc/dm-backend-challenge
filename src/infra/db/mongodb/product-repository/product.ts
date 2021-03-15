import { FindProductRepository } from '../../../../data/protocols/find-product-repository'
import { ProductModel } from '../../../../domain/models/product'
import { FindProductModel } from '../../../../domain/usecases/find-product'
import { MongoHelper } from '../helpers/mongo-helper'

export class ProductMongoRepository implements FindProductRepository {
  async find (productData: FindProductModel): Promise<ProductModel> {
    const orderCollection = MongoHelper.getCollection('products')
    const result = await orderCollection.findOne(productData)
    return MongoHelper.mapWithoutId(result)
  }
}
