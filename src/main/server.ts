import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import { AmqpConsumer } from '../infra/amqp/rabbitmq/consumer'
import env from './config/env'

MongoHelper.connect(`${env.mongo.url}/${env.mongo.database}`)
  .then(async () => {
    await AmqpConsumer.connect(env.amqp.url, env.amqp.exchange, env.amqp.queues.split(','))
    const app = (await import ('./config/app')).default
    app.listen(env.mongo.port, () => console.log('Server running at http://localhost:%s', env.mongo.port))
  })
  .catch(console.error)
