import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    let session = await getServerSession(req, res, authOptions);
    // console.log(session, 'session~~~~~~~~~~~');
    try {
      // const result = '성공';

      const db = (await connectDB).db('frankenshop');
      let result = await db
        .collection('carts')
        .find({ email: session?.user.email })
        .toArray();
      // console.log('result~~~~~~~~~~~~`', result);

  const cartData = [];
      const contentsCollection = db.collection('contents');
      // 'contents' 컬렉션에 연결합니다.
      // 장바구니 데이터를 가공한 결과를 저장할 빈 배열을 선언합니다.
      for (const el of result) {
        // 'result' 배열을 순회하면서 각 장바구니 항목을 'el'이라고 합니다.
        const contents = await contentsCollection.findOne({
          _id: new ObjectId(el.contents),
        });
        // console.log('contents~~~~~~~', contents);

        // 'contentsCollection'에서 해당 상품 ID를 사용하여 상품 정보를 찾습니다.
        el.contents = contents; // 'el' 객체에 상품 정보를 추가합니다.
        el.contents.quantity = el.quantity; // 상품 정보 객체에 'el'에서 가져온 수량 정보를 추가합니다.
        el.contents.checked = el.checked; // 상품 정보 객체에 'el'에서 가져온 체크상태 정보를 추가합니다.
        cartData.push(el.contents); // 처리된 상품 정보를 'cartData' 배열에 추가합니다.
      }
      
      console.log('cartData ㅎㅇ~~~~~~~~~~₩', cartData);




      return res.status(200).json(cartData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  }
}
