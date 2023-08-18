import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // console.log(req.body);
    if (req.body.title.length === 0) {
      return res.status(500).json('제목을 입력하세요.');
    } else if (req.body.content.length === 0) {
      return res.status(500).json('내용을 입력하세요.');
    }

    try {
      const db = (await connectDB).db('frankenshop');
      let result = await db.collection('post').insertOne(req.body);
      return res.status(200).redirect('/list');
    } catch (errors) {
      console.log('에러!', errors);
      return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
