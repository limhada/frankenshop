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
    // console.log(req.body)

    let session = await getServerSession(req, res, authOptions)
    

    try {
      const db = (await connectDB).db('frankenshop');

      let findAuthor = await db.collection('post').findOne({ _id : new ObjectId(req.body) })
      // console.log(findAuthor?.author,"찾은값");

      // 작성자와 삭제하는 사람이 같은지 확인
      if (findAuthor?.author === session.user.email) {
      let result = await db
        .collection('post')
        .deleteOne({ _id: new ObjectId(req.body) });
      // console.log(result); // document 삭제결과를 알려줌 이런식으로 -> { acknowledged: true, deletedCount: 1 }
      return res.status(200).json('삭제완료');
      } else {
        return res.status(500).json('현재유저와 작성자 불일치')
      }
    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
