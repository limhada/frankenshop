// MongoDB 드라이버에서 MongoClient와 MongoClientOptions을 가져옵니다.
import { MongoClient, MongoClientOptions } from 'mongodb';

const url = process.env.NEXT_PUBLIC_DB_URL || '';

// 연결 설정을 지정합니다. useNewUrlParser 설정만을 사용합니다.
const options = { useNewUrlParser: true };

// Promise 형태의 MongoClient 객체를 저장하는 connectDB 변수를 선언합니다.
let connectDB: Promise<MongoClient>;

// 개발 환경에서는 서버 실행 중에 동일한 MongoClient 객체를 유지하기 위해 global 객체를 사용합니다.
if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(
      url,
      options as MongoClientOptions // MongoClientOptions 형태로 캐스팅합니다.
    ).connect();
  }
  connectDB = global._mongo;
} else {
  // 프로덕션 환경에서는 매번 새로운 MongoClient 객체를 생성합니다.
  connectDB = new MongoClient(url, options as MongoClientOptions).connect();
}

// DB 연결 객체(Promise<MongoClient>)를 내보내도록 설정합니다.
export { connectDB };
