import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log('req.body._id ~~~~~~~~~~~~~~~~', req.body._id); // req.body -> 현재 제품의 _id
    // console.log('req.body._id ~~~~~~~~~~~~~~~~', req.query, '??'); // req.body -> 현재 제품의 _id

    let session = await getServerSession(req, res, authOptions);
    // console.log('회원정보 확인~~~~~~~~~~~~', session.user.email);

    const insertData = {
      contents: new ObjectId(req.body._id),
      email: session.user.email,
      quantity: 1,
      checked : false,
    };

    try {
      const db = (await connectDB).db('frankenshop');

      let result = await db
        .collection('carts')
        .find({ contents: new ObjectId(req.body._id), email: session.user.email })
        .toArray();

      // console.log('ㅎㅇ~~~~~~~~~~', result);
      if (result.length === 0) {
        
        await db.collection('carts').insertOne(insertData);
        // console.log('처음 데이터 추가 완료');
      } else if (result.length > 0) {
        // 이미 장바구니에 담겨있다면 수량 1증가
        const updateResult = await db
          .collection('carts')
          .updateOne(
            { contents: new ObjectId(req.body._id), email: session.user.email },
            { $inc: { quantity: 1 } }
          );
        // console.log("카트값 1증가 성공");
      }

      // let updateResult = await db
      //   .collection('carts')
      //   .find({ email: session.user.email })
      //   .toArray();
      // console.log('장바구니에 추가된 값 확인~~~~~~~~~~~~~~~', updateResult);
      // return res.status(200).json(updateResult);

      return res.status(200).json('성공');

    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
