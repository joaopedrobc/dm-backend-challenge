export default {
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017',
    database: process.env.DATABASE || 'dm-challenge',
    port: process.env.PORT || 3000
  },
  amqp: {
    url: process.env.AMQP_URL || 'amqp://localhost',
    exchange: process.env.AMQP_EXCHANGE || 'stock',
    queues: process.env.AMQP_QUEUES || 'incremented,decremented'
  }

}
