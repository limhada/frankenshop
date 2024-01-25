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
    let session = await getServerSession(req, res, authOptions);

    try {
      const db = (await connectDB).db('frankenshop');

      let result = await db
        .collection('likes')
        .find({
          // contents: new ObjectId(req.body._id),
          email: session.user.email,
        })
        .toArray();
        console.log('서버 result ㅎㅇ ~~~~~~~~~~', result);

      return res.status(200).json(result);
    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
