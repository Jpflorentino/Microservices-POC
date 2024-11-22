const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "myAPICacheDB";

async function getFromCache(collection, key) {
  const db = client.db(dbName);
  const result = await db.collection(collection).findOne({ key });
  return result ? result.data : null;
}

async function setCache(collection, key, data, ttl = 3600) {
  const db = client.db(dbName);
  const expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + ttl);

  await db
    .collection(collection)
    .updateOne(
      { key },
      { $set: { key, data, expiresAt: expirationDate } },
      { upsert: true },
    );
}

async function clearExpiredCache(collection) {
  const db = client.db(dbName);
  await db
    .collection(collection)
    .deleteMany({ expiresAt: { $lt: new Date() } });
}

module.exports = { getFromCache, setCache, clearExpiredCache };
