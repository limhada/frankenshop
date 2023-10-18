import { ObjectId } from 'mongodb';
import { connectDB } from '../../../util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

import CartList from './cartList';

// TODO: nextjs Middleware 사용해서 로그인 안된 사용자 일때, /carts 페이지 접근 막기
export interface CartProps {
  _id: ObjectId;
  title: string;
  description: string;
  img_src: string;
  author: string;
  price: string;
  like: boolean;
  quantity: number;
}[]

export default async function Carts() {
  let session = await getServerSession(authOptions);
  // console.log(session.user.email, 'ㅎㅇ~~~~~~~~~~~~~');

  const db = (await connectDB).db('frankenshop');
  let result = await db
    .collection('carts')
    .find({ email: session.user.email, })
    .toArray();
  // console.log('result확인~~~~~~~~~', result);

  const contentsCollection = db.collection('contents');
  // carts 컬렉션에서 contents필드의 값을 배열로 저장
  const cartData: CartProps[] = [];
  for (const el of result) {
    const contents = await contentsCollection.findOne({ _id: el.contents });
    el.contents = contents;
    // cartData.push(contents as CartProps); // 아래 코드와 동치
    el.contents.quantity = el.quantity;
    cartData.push(el.contents);
  }


  return (
    <div>
      <h1>장바구니</h1>
      <CartList cartData={cartData} />
    </div>
  );
}
