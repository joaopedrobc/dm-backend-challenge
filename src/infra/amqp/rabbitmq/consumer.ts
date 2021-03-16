import amqp from 'amqplib/callback_api'
import { ProductMongoRepository } from '../../db/mongodb/product-repository/product'

export const AmqpConsumer = {
  async connect (uri: string, exchange: string, queues: string[]): Promise<void> {
    amqp.connect(uri, (connectError, connection) => {
      if (connectError) throw connectError

      connection.createChannel((channelError, channel) => {
        if (channelError) throw channelError
        channel.assertExchange(exchange, 'direct', {
          durable: true
        })

        channel.assertQueue('', { exclusive: true }, (queueError, q) => {
          if (queueError) throw queueError
          console.log(' [*] Waiting for stock changes.')
          queues.forEach((queueName) => {
            channel.bindQueue(q.queue, exchange, queueName)
          })

          channel.consume(q.queue, async (message) => {
            const { routingKey } = message.fields
            const { content } = message
            const name = content.toString().replace(/"/g, '')
            console.log(" [x] %s: '%s'", routingKey, content.toString())

            const productMongoRepository = new ProductMongoRepository()
            const product = await productMongoRepository.find({ name: name })

            if (routingKey === 'incremented') {
              product.quantity++
            } else {
              product.quantity--
              if (product.quantity < 0) product.quantity = 0
            }

            await productMongoRepository.update({ name: name }, product)
          }, { noAck: true })
        })
      })
    })
  }
}
