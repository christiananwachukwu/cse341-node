require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function main() {

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB!");

    await listDatabases(client);

  } catch (e) {
    console.error("something went wrong", e);
  } finally {
    await client.close();
  }
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

main().catch(console.error);