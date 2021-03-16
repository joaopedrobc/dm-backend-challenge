import { Db, MongoClient } from 'mongodb'

module.exports = {
  async up (db: Db, client: MongoClient) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down (db: Db, client: MongoClient) {
    await db.collection('procucts').deleteMany({})
  }
}
