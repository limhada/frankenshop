// 원래의 import 문에 MongoClient, MongoClientOptions, Promise 추가
import { MongoClient, MongoClientOptions } from 'mongodb';

const url = process.env.NEXT_PUBLIC_DB_URL || '';
const options = { useNewUrlParser: true };
let connectDB: Promise<MongoClient>; // 수정된 타입을 지정

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
