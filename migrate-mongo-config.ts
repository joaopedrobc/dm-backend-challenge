import env from './src/main/config/env'

export = {
  mongodb: {
    url: env.mongo.url,
    databaseName: env.mongo.database,

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
