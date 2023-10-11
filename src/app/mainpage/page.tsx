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
  like: boolean;
}

export default async function Mainpage() {
  const client = await connectDB;
  const db = client.db('frankenshop');
  // let result = await db.collection('contents').find().toArray();
  
  let result = await db.collection<ListProps>('contents').find().toArray();
  
  

  return (
    <div>
      <h1>메인페이지</h1>

      <ImageComponent />
      <Contents result={result} />
    </div>
  );
}
