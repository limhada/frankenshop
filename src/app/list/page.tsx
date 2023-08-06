import Link from 'next/link';
import { connectDB } from '../../../util/database';

export default async function List() {
  const client = await connectDB;
  const db = client.db('frankenshop');
  let result = await db.collection('list').find().toArray();
  // console.log(result);
  // console.log(result[0]._id, "확인")


  return (
    <div>
      <h2>
        {result.map((el, i) => (
          <div className='list-item' key={i}>
            <h4>{el.title}</h4>
            <Link href={'/detail/id' + el._id}>링크</Link>
          </div>
        ))}
      </h2>
      <div>
        <h4>상품명 $40</h4>
      </div>
    </div>
  );
}
