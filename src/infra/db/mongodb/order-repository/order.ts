import { CreateFullOrderModel, CreateOrderRepository } from '../../../../data/protocols/create-order-repository'
import { OrderModel } from '../../../../domain/models/order'
import { MongoHelper } from '../helpers/mongo-helper'

export class OrderMongoRepository implements CreateOrderRepository {
  async create (orderData: CreateFullOrderModel): Promise<OrderModel> {
    const orderCollection = MongoHelper.getCollection('orders')
    const result = await orderCollection.insertOne(orderData)
    return MongoHelper.map(result.ops[0])
  }
}
