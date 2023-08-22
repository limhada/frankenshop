import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    // console.log(req.body)

    try {
      const db = (await connectDB).db('frankenshop');
      let result = await db
        .collection('post')
        .deleteOne({ _id: new ObjectId(req.body) });
      console.log(result); // document 삭제결과를 알려줌 이런식으로 -> { acknowledged: true, deletedCount: 1 }
      res.status(200).json('삭제완료');
    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
