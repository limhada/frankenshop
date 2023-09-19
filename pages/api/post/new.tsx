import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

// TODO: 로그인 되어 있을때만 게시물 작성할 수 있게

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // console.log(req.body, ' 글쓰기 req 확인 ~~~~~~~~~');

    let session = await getServerSession(req, res, authOptions);
    // console.log(session.user.email, "확인~~~~~~~~~~~~~~");

    if (session) {
      req.body.author = session.user.email;
    }
    // console.log(req.body);

    if (req.body.title.length === 0) {
      return res.status(500).json('제목을 입력하세요.');
    } else if (req.body.content.length === 0) {
      return res.status(500).json('내용을 입력하세요.');
    }

    try {
      const db = (await connectDB).db('frankenshop');
      let result = await db.collection('post').insertOne(req.body);
      return res.status(200).json('성공')
      // return res.status(302).redirect('/list');
    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
