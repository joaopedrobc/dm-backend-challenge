import { FindProductRepository } from '../../../../data/protocols/find-product-repository'
import { UpdateProductRepository } from '../../../../data/protocols/update-product-repository'
import { ProductModel } from '../../../../domain/models/product'
import { FindProductModel } from '../../../../domain/usecases/find-product'
import { UpdateProductModel } from '../../../../domain/usecases/update-product'
import { MongoHelper } from '../helpers/mongo-helper'

export class ProductMongoRepository implements FindProductRepository, UpdateProductRepository {
  async find (productData: FindProductModel): Promise<ProductModel> {
    const productCollection = MongoHelper.getCollection('products')
    const result = await productCollection.findOne(productData)
    return MongoHelper.mapWithoutId(result)
  }

  async update (name: FindProductModel, productData: UpdateProductModel): Promise<ProductModel> {
    const productCollection = MongoHelper.getCollection('products')
    const newValues = { $set: productData }
    await productCollection.updateOne(name, newValues)
    return this.find({ name: productData.name })
  }
}
