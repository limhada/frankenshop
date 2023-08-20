import Link from 'next/link';
import { connectDB } from '../../../util/database';
import DetailLink from './DetailLink';

export default async function List() {
  const client = await connectDB;
  const db = client.db('frankenshop');
  let result = await db.collection('post').find().toArray();
  // console.log(result);
  // console.log(result[0]._id, "확인")

  return (
    <div>
      <div className='p-2 bg-gray-100'>
        {result.map((el, i) => (
          <div className='shadow-md bg-white rounded-md p-5 mb-3' key={i}>
            <Link href={'/detail/' + result[i]._id.toString()}>
              <h4 className='text-2xl font-bold m-0'>{el.title}</h4>
              <p className='text-gray-500 my-1 mx-0'>{el.content}</p>
            </Link>
            <Link href={'/edit/' + result[i]._id.toString()}>수정</Link>
          </div>
        ))}
      </div>
      <div>
        <h4>상품명 $40</h4>
      </div>
    </div>
  );
}
