import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    // console.log(req.body, "확인~~~~~~~")

    try {
      let session = await getServerSession(req, res, authOptions);

      // 로그인이 안되어 있다면 삭제 버튼 클릭시 동작 x
      if (session === null) {
        // console.log("확인 403~~~~");
        return res.status(403).json('로그인이 안되어있습니다.');
      }

      const db = (await connectDB).db('frankenshop');
      let findAuthor = await db
        .collection('post')
        .findOne({ _id: new ObjectId(req.body) });
      // console.log(findAuthor?.author,"찾은값");

      let userCred = await db
        .collection('user_cred')
        .findOne({ email: session?.user.email });
      // console.log(userCred?.role, "~~~~~~~~~");

      // 작성자와 삭제하는 사람이 같은지 확인
      if (
        findAuthor?.author === session.user.email ||
        userCred?.role === 'admin'
      ) {
        let result = await db
          .collection('post')
          .deleteOne({ _id: new ObjectId(req.body) });
        // console.log(result); // document의 삭제결과를 알려줌 이런식으로 -> { acknowledged: true, deletedCount: 1 }
        // console.log("확인 200~~~~");
        return res.status(200).json('삭제완료');
      } else {
        console.log('에러');
        return res.status(403).json('권한이 없습니다.');
      }
    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json('서버 에러가 발생했습니다.');
    }
  }
}
