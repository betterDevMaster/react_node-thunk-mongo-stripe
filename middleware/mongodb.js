const { MongoClient } = require("mongodb");

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase(MONGODB_URI, MONGODB_DB) {
  // check the MongoDB URI
  if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }

  // check the MongoDB DB
  if (!MONGODB_DB) {
    throw new Error("Define the MONGODB_DB environmental variable");
  }

  // // check the cached.
  // if (cachedClient && cachedDb) {
  //   // load from cache
  //   return {
  //     client: cachedClient,
  //     db: cachedDb,
  //   };
  // }

  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to cluster
  let client = new MongoClient(MONGODB_URI, opts);
  await client.connect();
  let db = client.db(MONGODB_DB);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}

module.exports = {
  connectToDatabase,
};
