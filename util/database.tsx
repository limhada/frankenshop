import { MongoClient, MongoClientOptions } from 'mongodb';

const url = process.env.NEXT_PUBLIC_DB_URL || '';
const options = { useNewUrlParser: true };
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(
      url,
      options as MongoClientOptions
    ).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options as MongoClientOptions).connect();
}

export { connectDB };
