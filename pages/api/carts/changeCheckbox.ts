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
    let session = await getServerSession(req, res, authOptions);

    console.log(req.body, '확인~~~~~~~~~~~~~~~');

    try {
      const db = (await connectDB).db('frankenshop');

      let result = await db.collection('carts').updateOne(
        {
          contents: new ObjectId(req.body._id),
          email: session.user.email,
        },
        // checked를 반전시키는 몽고db문법
        [
          {
            $set: {
              checked: { $not: '$checked' },
            },
          },
        ]
      );
      // console.log('ㅎㅇ');
      // console.log(result); // document의 삭제결과를 알려줌 이런식으로 -> { acknowledged: true, deletedCount: 1 }
      // console.log('확인 200~~~~');

      return res.status(200).json('체크박스 성공');
    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json('서버 에러가 발생했습니다.');
    }
  }
}
