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
    try {

      let session = await getServerSession(req, res, authOptions);

      let saveData = {
        content: req.body.comment, //댓글내용
        parent: new ObjectId(req.body._id), // 부모게시물 _id
        author: session?.user.email, // 유저이메일
        author_name: session.user.name,
      };

      const db = (await connectDB).db('frankenshop');
      let result = db.collection('comment').insertOne(saveData);
      return res.status(200).json('저장완료');
    } catch (error) {
      console.log(error, '서버에러');
    }
  }
}
