import { connectDB } from '../../util/database';
import Mainpage from './mainpage/page';

export default async function Home() {
  const client = await connectDB;
  const db = client.db('frankenshop');
  let result = await db.collection('post').find().toArray();
  // console.log(result);

  return (
    <div>
      <Mainpage />
    </div>
  );
}
