import { connectDB } from '../../util/database';

export default async function Home() {
  const client = await connectDB;
  const db = client.db('frankenshop');
  let result = await db.collection('post').find().toArray();
  console.log(result);

  return (
    <div>
      <div className='bg-white'>메인 화면</div>
    </div>
  );
}
