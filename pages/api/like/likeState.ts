import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    console.log(
      req.query._id,
      'likeSlice에서 쿼리스트링으로 likeState api에서 받은 값 확인'
    );
    try {
      let session = await getServerSession(req, res, authOptions);
      const db = (await connectDB).db('frankenshop');
      let likesResult = await db
        .collection('contents')
        .findOne({ _id: new ObjectId(req.query._id as string) });
      console.log(likesResult, "likesResult ㅎㅇ~~~~~~~~~");
      // return res.status(200).json(likesResult);
      return res.status(200).json('테스트 성공');
    } catch (error) {
      console.log(error, '서버에러');
    }
  }
}