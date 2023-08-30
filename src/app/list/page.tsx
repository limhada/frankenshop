import { ObjectId } from 'mongodb';
import { connectDB } from '../../../util/database';
import ListItem from './ListItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

export interface ListProps {
  _id: ObjectId;
  title: string;
  content: string;
  author: string;
}

export default async function List() {
  let session = await getServerSession(authOptions);


  const client = await connectDB;
  const db = client.db('frankenshop');
  let result = await db.collection<ListProps>('post').find().toArray();
  // console.log("확인중", result);
  // console.log(result[0]._id, "확인")

  return (
    <div>
      <div className='p-2 bg-gray-100'>
        <ListItem result={result} session={session}/>
      </div>
      <div>
        <h4>상품명 $40</h4>
      </div>
    </div>
  );
}
