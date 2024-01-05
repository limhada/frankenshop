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
    // console.log(req.body);
    let session = await getServerSession(req, res, authOptions);

    try {
      const db = (await connectDB).db('frankenshop');

      // carts에서 email이 같은 것 중 checked가 false인 것이 있는지
      let result = await db
        .collection('carts')
        .find({
          email: session.user.email,
          checked: false,
        })
        .toArray();

      if (result.length > 0) {
        // result 배열에서 _id 값들을 추출
        const idsToUpdate = result.map((item) => item._id);
        // carts 컬렉션에서 _id가 idsToUpdate 배열에 포함된 값인 문서들을 찾아 checked를 true로 업데이트
        const updateResult = await db
          .collection('carts')
          .updateMany(
            { _id: { $in: idsToUpdate } },
            { $set: { checked: true } }
          );
      } else {
        // result.length가 0이면 carts컬렉션에서 이메일이 일치하는 정보의 checked를 모두 false로 변경한다
        let resultFalse = await db.collection('carts').updateMany(
          {
            email: session.user.email,
          },
          {
            $set: {
              checked: false,
            },
          }
        );
      }

      // console.log(result, 'result~~~~~~~~~~~~~~~~~~~~₩', result.length);
      // console.log(result); // document의 삭제결과를 알려줌 이런식으로 -> { acknowledged: true, deletedCount: 1 }
      // console.log('확인 200~~~~');

      return res.status(200).json('성공');
    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json('서버 에러가 발생했습니다.');
    }
  }
}
