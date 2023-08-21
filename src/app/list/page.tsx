import { connectDB } from '../../../util/database';
import ListItem from './ListItem';

export default async function List() {
  const client = await connectDB;
  const db = client.db('frankenshop');
  let result = await db.collection('post').find().toArray();
  // console.log("확인중", result);
  // console.log(result[0]._id, "확인")

  // FIXME: result를 transformedResult로 변환해야 되는 이유 잘 모르겠다..
  const transformedResult = result.map((el) => ({
    _id: el._id,
    title: el.title,
    content: el.content,
  }));

  return (
    <div>
      <div className='p-2 bg-gray-100'>
        <ListItem result={transformedResult} />
      </div>
      <div>
        <h4>상품명 $40</h4>
      </div>
    </div>
  );
}
