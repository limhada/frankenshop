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
        parent: new ObjectId(req.body._id), // 부모게시물 _id(댓글이 달린 게시물의 _id)
        author: session?.user.email, // 유저이메일
        author_name: session.user.name,
      };

      const db = (await connectDB).db('frankenshop');
      await db.collection('comment').insertOne(saveData);

      // let result = await db.collection('comment').find({ parent: new ObjectId(req.query._id as string) }).toArray()
      let result = await db.collection('comment').find({ parent: new ObjectId(req.body._id) }).toArray()

      
      // console.log(req.body._id,"~~~~~~~~~~~~~~~");
      // console.log(result,"~~~~~~~~~~~~~~~~~~`");

      return res.status(200).json(result);
    } catch (error) {
      console.log(error, '서버에러');
    }
  }
}
