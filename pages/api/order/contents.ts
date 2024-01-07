import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';
import { deflate } from 'zlib';

export interface ListProps {
  _id: ObjectId;
  title: string;
  description: string;
  img_src: string;
  author: string;
  price: number;
  isLiked: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('ㅎㅇ~~~~~~~~~~~', req.query);

  if (req.method === 'GET') {
    try {
      // let session = await getServerSession(req, res, authOptions);
      // const db = (await connectDB).db('frankenshop');
      // const contentsResult = await db.collection('contents').find().toArray();
      // const likesResult = await db
      //   .collection('likes')
      //   .find({ email: session?.user.email })
      //   .toArray();

      return res.status(200).json('성공');
    } catch (error) {
      console.log(error, '서버에러');
    }
  }
}
