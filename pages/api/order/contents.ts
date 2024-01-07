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
  
  console.log('req.query.itemId~~~~~~~~~~~', req.query.itemId);
  // console.log('ㅎㅇ~~~~~~~~~~~타입~~', typeof req.query.itemId);

  if (req.method === 'GET') {
    try {

      // itemId가 없다는 것은 상세페이지에서 구매하기를 누르지 않아서 itemId가 안넘어온것임!
      // FIXME: http://localhost:3000/order/detail로 url을 직접 입력해서 들어오는 것 막기위함
      if (req.query.itemId !== '') {

     
      let session = await getServerSession(req, res, authOptions);

      const db = (await connectDB).db('frankenshop');
      const result = await db
        .collection('orders')
        .findOne({ email: session?.user.email, _id: new ObjectId(req.query.itemId?.toString()), status: "결제대기"})

      // console.log(result, 'result~~~~~~~~~~~~');

      return res.status(200).json('성공');

    }

    } catch (error) {
      console.log(error, '서버에러');
    }
  }
}
