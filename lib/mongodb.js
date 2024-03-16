const { MongoClient } = require("mongodb");

if (!process.env.MONGODB_URI) {
  throw new Error("Invalid/Missing environment variable: 'MONGODB_URI'");
}

const uri = process.env.MONGODB_URI;
const options = {};

async function connectToMongo() {
  try {
    client = await new MongoClient(uri, options).connect();
    return client;
  } catch (err) {
    throw err;
  }
}

let client;
let clientPromise = connectToMongo();

module.exports = {
  clientPromise,
  async getDatabase(dbName) {
    const client = await clientPromise;
    const db = client.db(dbName);
    return db;
  }
};