const env = require('./src/main/config/env')
const config = {
  mongodb: {
    url: env.mongoUrl,
    databaseName: env.database,

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.ts',
  useFileHash: false
}

module.exports = config
