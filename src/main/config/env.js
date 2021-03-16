const env = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017',
  database: process.env.DATABASE || 'dm-challenge',
  port: process.env.PORT || 5050
}

module.exports = env
