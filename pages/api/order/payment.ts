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
    console.log('req.body ㅎㅇ~~~~~~~~~', req.body);
    console.log('req.body ㅎㅇ~~~~~~~~~', req.body._id, req.body.quantity);
    
    let session = await getServerSession(req, res, authOptions);
    // console.log(session.user.email, "확인~~~~~~~~~~~~~~")
    try {
      const db = (await connectDB).db('frankenshop');
      // let result = await db.collection('contents').findOne({ contents: new ObjectId(req.body) });

      // console.log(result,'데이터 ㅎㅇ~~~~~~~~~~~~~~~');


      
      return res.status(200).json('성공')

      // return res.status(200).redirect(302, '/list');
    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
