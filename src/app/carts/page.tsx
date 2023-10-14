import { ObjectId } from 'mongodb';
import { connectDB } from '../../../util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

import CartList from './cartList';

export interface CartProps {
  _id: ObjectId;
  title: string;
  description: string;
  img_src: string;
  author: string;
  price: string;
  like: boolean;
}

export default async function Carts() {
  let session = await getServerSession(authOptions);
  console.log(session.user.email, 'ㅎㅇ~~~~~~~~~~~~~');

  const db = (await connectDB).db('frankenshop');
  let result = await db
    .collection('carts')
    .find({ email: session.user.email })
    .toArray();
  console.log('result확인~~~~~~~~~', result);

  const contentsCollection = db.collection('contents');
  // carts 컬렉션에서 contents필드의 값을 배열로 저장
  // const resultsArray = await db.collection('carts').distinct('contents');
  // console.log(resultsArray, '???????????????');
  const cartData: CartProps[] = [];
  for (const el of result) {
    const contents = await contentsCollection.findOne({ _id: el.contents });
    el.contents = contents;
    // cartData.push(contents);
    cartData.push(contents as CartProps);
    // console.log(el.contents, 'ㅎㅇ~~~~~~~~₩₩');
  }
  console.log(cartData, '~~~~~~~~~~~~~ㅎㅇ');

  return (
    <div>
      <h1>장바구니</h1>
      <CartList cartData={cartData} />
    </div>
  );
}
