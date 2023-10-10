import { ObjectId } from 'mongodb';
import { connectDB } from '../../../util/database';
import Contents from './Contents';
import ImageComponent from './ImageComponent';

export interface ListProps {
  _id: ObjectId;
  title: string;
  description: string;
  img_src: string;
  author: string;
  price: string;
  like: string;
}

export default async function Mainpage() {
  const client = await connectDB;
  const db = client.db('frankenshop');
  // let result = await db.collection('contents').find().toArray();
  
  let result = await db.collection<ListProps>('contents').find().toArray();
  
  
  // console.log('데이터확인~~~~~~~', result);

  /*
  result = [
  {
    _id: new ObjectId("6509b47802b7712df0cd3d53"),
    title: '상품1',
    content: '상품1의 내용',
    img_src: 'https://github.com/limhada/frankenshop/blob/main/public/imgtest/1.jpeg?raw=true',
    author: 'q',
    price: '10,000',
    like: 'true'
  },
  {
    _id: new ObjectId("65254cdcbbca6b503b707627"),
    title: '상품2',
    content: '상품2의 내용',
    img_src: 'https://github.com/limhada/frankenshop/blob/main/public/imgtest/1.jpeg?raw=true',
    author: 'q',
    price: '12,000',
    like: 'true'
  },]
  */
  return (
    <div>
      <h1>메인페이지</h1>

      <ImageComponent />
      <Contents result={result} />
    </div>
  );
}
