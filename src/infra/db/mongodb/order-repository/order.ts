import { CreateFullOrderModel, CreateOrderRepository } from '../../../../data/protocols/create-order-repository'
import { FindOrderModel, FindOrderRepository } from '../../../../data/protocols/find-order-repository'
import { OrderModel } from '../../../../domain/models/order'
import { MongoHelper } from '../helpers/mongo-helper'

export class OrderMongoRepository implements CreateOrderRepository, FindOrderRepository {
  async create (orderData: CreateFullOrderModel): Promise<OrderModel> {
    const orderCollection = MongoHelper.getCollection('orders')
    const result = await orderCollection.insertOne(orderData)
    return MongoHelper.map(result.ops[0])
  }

  async find (id: FindOrderModel): Promise<OrderModel[]> {
    const orderCollection = MongoHelper.getCollection('orders')
    const result = await orderCollection.find(id)
    const orders = await result.toArray()
    const ordersMapped = orders.map(order => (
      MongoHelper.map(order)
    ))

    return MongoHelper.map(ordersMapped)
  }
}
