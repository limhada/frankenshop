import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log(req.body._id); // req.body -> 현재 제품의 _id

    const insertData = {
      parent: new ObjectId(req.body._id),
    };

    try {
      const db = (await connectDB).db('frankenshop');

      let result = await db
        .collection('contents')
        .find({ _id: new ObjectId(req.body._id) })
        .toArray();
      console.log('ㅎㅇ~~~~~~~~~~', result);
      if (result.length === 0) {
        console.log('없음');   
      }

      return res.status(200).json('성공');
      // return res.status(302).redirect('/list');
    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
