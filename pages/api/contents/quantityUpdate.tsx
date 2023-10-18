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
    // console.log(typeof req.body.increase)
    // console.log(req.body)

    let session = await getServerSession(req, res, authOptions);
    // console.log('회원정보 확인~~~~~~~~~~~~', session.user.email);

    try {
      const db = (await connectDB).db('frankenshop');

      let result = await db
        .collection('carts')
        .findOne({ contents: new ObjectId(req.body._id), email: session.user.email });

      // console.log('ㅎㅇ~~~~~~~~~~', result?.quantity);
      // console.log('ㅎㅇ~~~~~~~~~~', result.);

      if (result?.quantity > 0 && req.body.increase === 1) {
        const updateResult = await db
          .collection('carts')
          .updateOne(
            { contents: new ObjectId(req.body._id), email: session.user.email },
            { $inc: { quantity: 1 } }
          );
        // console.log(updateResult,"카트값 1증가 성공");
        /*
          // TODO: 정리하기 이 정보는 MongoDB의 updateOne() 함수의 응답 정보입니다. updateOne() 함수는 MongoDB 컬렉션에서 하나의 문서를 업데이트하는 데 사용되는 함수입니다.
            {
              acknowledged: true,
              modifiedCount: 1,
              upsertedId: null,
              upsertedCount: 0,
              matchedCount: 1

              해석
              acknowledged가 true이므로 업데이트 작업이 성공적으로 수행되었습니다.
              modifiedCount가 1이므로 업데이트된 문서의 수가 1입니다.
              upsertedId가 null이므로 새로운 문서가 생성되지 않았습니다.
              upsertedCount가 0이므로 새로운 문서가 생성되지 않았습니다.
              matchedCount가 1이므로 업데이트 작업이 일치한 문서의 수가 1입니다.
            } 
          */
      } else if (result?.quantity > 1 && req.body.decrease === -1) {
        const updateResult = await db
          .collection('carts')
          .updateOne(
            { contents: new ObjectId(req.body._id), email: session.user.email },
            { $inc: { quantity: -1 } }
          );
        // console.log('카트값 1감소 성공');
      }

      // quantity(수량) 증가 및 감소 시 증감이 반영된 quantity 값 응답으로 클라이언트에 전해주기
      let quantityResult = await db
        .collection('carts')
        .findOne({ contents: new ObjectId(req.body._id), email: session.user.email });
      return res.status(200).json(quantityResult?.quantity);

    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
