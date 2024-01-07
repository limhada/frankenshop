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
    // console.log('req.body ㅎㅇ~~~~~~~~~', req.body._id, req.body.quantity);

    let session = await getServerSession(req, res, authOptions);
    // console.log(session.user.email, "확인~~~~~~~~~~~~~~")
    try {
      const db = (await connectDB).db('frankenshop');
      let result = await db
        .collection('contents')
        .findOne({ _id: new ObjectId(req.body.itemId) });
        
        // console.log(result, 'result~~~~~~~~~~~');
      /* TODO: 서버에서 찾은 해당 아이템의 정보가 담긴 result에서 
        price: result.price
        contents: result._id
        quantity: body.quantity
        status: (주문상태 결제대기, 결제완료, 배송중, 완료 등)
        를 orders라는 컬렉션에 추가한다 그리고         
        */

        // console.log('result?.price', result?.price * req.body.quantity);
        // console.log(Number(result?.price.replace(/,/g, '')), Number(req.body.quantity), '~~~~~~~~~~~~~~~~~~~~');


        // 한국시간 구하기
        const now = new Date();
        const utc = now.getTime(); // UTC 시간은 이미 밀리초를 나타내므로 변환 필요 없음
        const koreaTimeDiff = 9 * 60 * 60 * 1000;
        const korNow = new Date(utc + koreaTimeDiff);
        

        
        const insertData = {
          contents: new ObjectId(req.body._id),
          email: session.user.email, // 구매자
          quantity: req.body.quantity,
          // totalPrice: Number(result?.price) * Number(req.body.quantity),
          totalPrice: result?.price * req.body.quantity,
          status : '결제대기', // 주문상태
          createdAt: korNow, // 주문 시간을 기록
        };


        const insert = await db.collection('orders').insertOne(insertData);
        
    /*  insert= {
          acknowledged: true, // 메서드가 성공적으로 완료되었는지 여부를 나타냅니다. true는 성공, false는 실패를 의미
          insertedId: new ObjectId("659a2c3ec7ec27fa6a002dbf") // 새로 삽입된 문서의 _id 값
        } */

        // insert가 성공적으로 추가되면 insert.insertedId를 res에 넣어 반환
        if(insert.acknowledged === true) {

          const insertResult = insert.insertedId.toString()
          console.log('insert.insertedId~~~~~~~~~~~~~~', insert.insertedId.toString());
          return res.status(200).json(insertResult);
        }



      // return res.status(200).redirect(302, '/list');
    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
