import { MongoClient, MongoClientOptions } from 'mongodb';

const url = process.env.NEXT_PUBLIC_DB_URL || '';
const options = { useUnifiedTopology: true };
let connectDB;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options as MongoClientOptions).connect(); // 타입 변환 추가
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options as MongoClientOptions).connect(); // 타입 변환 추가
}

export { connectDB };
