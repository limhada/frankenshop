import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

// TODO: 로그인 되어 있을때만 게시물 작성할 수 있게

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // console.log('req.body ㅎㅇ~~~~~~~~~', req.body);
    // console.log(
    //   'req.body.itemId= ',
    //   req.body.itemId,
    //   'req.body.quantity= ',
    //   req.body.quantity
    // );

    let session = await getServerSession(req, res, authOptions);
    // console.log(session.user.email, "확인~~~~~~~~~~~~~~")
    try {
      const db = (await connectDB).db('frankenshop');
      let result = await db
        .collection('contents')
        .findOne({ _id: new ObjectId(req.body.itemId) });

      // console.log(result, 'ㅎㅇ result~~~~~~~~~~~~~~');

      // console.log('result?.price', result?.price * req.body.quantity);
      // console.log(Number(result?.price.replace(/,/g, '')), Number(req.body.quantity), '~~~~~~~~~~~~~~~~~~~~');

      // 한국시간 구하기
      const now = new Date();
      const utc = now.getTime(); // UTC 시간은 이미 밀리초를 나타내므로 변환 필요 없음
      const koreaTimeDiff = 9 * 60 * 60 * 1000;
      const korNow = new Date(utc + koreaTimeDiff);

      const insertData = {
        itemId: new ObjectId(req.body.itemId),
        title: result?.title,
        email: session.user.email, // 구매자 이메일
        name: session.user.name, // 구매자 이름
        totalQuantity: req.body.quantity,
        // totalPrice: Number(result?.price) * Number(req.body.quantity),
        totalPrice: result?.price * req.body.quantity,
        status: '결제대기', // 주문상태
        createdAt: korNow, // 주문 시간을 기록
      };

      const insert = await db.collection('orders').insertOne(insertData);

      /*  insert= {
          acknowledged: true, // 메서드가 성공적으로 완료되었는지 여부를 나타냅니다. true는 성공, false는 실패를 의미
          insertedId: new ObjectId("659a2c3ec7ec27fa6a002dbf") // 새로 삽입된 문서의 _id 값
        } */

      // insert가 성공적으로 추가되면 insert.insertedId를 res에 넣어 반환
      if (insert.acknowledged === true) {
        const insertResult = insert.insertedId.toString();
        // console.log(
        //   'insert.insertedId~~~~~~~~~~~~~~',
        //   insert.insertedId.toString()
        // );

        // console.log('itemId ~~~~~~', req.body.itemId);

        return res
          .status(200)
          .json({ _id: insertResult, totalPrice: insertData.totalPrice });
      }

      // return res.status(200).redirect(302, '/list');
    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
