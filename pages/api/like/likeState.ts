import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      let session = await getServerSession(req, res, authOptions);
      const db = (await connectDB).db('frankenshop');
      const likesResult = await db
        .collection('likes')
        .find({ email: session?.user.email })
        .toArray();
      // console.log(session);
      // console.log(likesResult, "ㅎㅇ~~~~~~~~~");
      // return res.status(200).json(likesResult[0]);
      return res.status(200).json('테스트 성공');
    } catch (error) {
      console.log(error, '서버에러');
    }
  }
}
