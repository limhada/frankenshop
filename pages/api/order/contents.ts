import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

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
  // console.log(
  //   'req.query._id= ',
  //   req.query._id,
  //   'req.query.itemId= ',
  //   req.query.itemId,
  //   'req.query.totalPrice= ',
  //   req.query.totalPrice // String이라 Number로 변경해야 함
  // );
  // console.log('ㅎㅇ~~~~~~~~~~~타입~~', typeof req.query.itemId);

  if (req.method === 'GET') {
    try {
      // itemId가 없다는 것은 상세페이지에서 구매하기를 누르지 않아서 itemId가 안넘어온것임!
      // FIXME: http://localhost:3000/order/detail로 url을 직접 입력해서 들어오는 것 막기위함???
      if (req.query.itemId !== '' && req.query._id !== '') {
        let session = await getServerSession(req, res, authOptions);

        const db = (await connectDB).db('frankenshop');
        const ordersResult = await db.collection('orders').findOne({
          _id: new ObjectId(req.query._id?.toString()),
          itemId: new ObjectId(req.query.itemId?.toString()),
          email: session.user.email,
          totalPrice: Number(req.query.totalPrice),
          status: '결제대기',
        });

        // console.log('ordersResult~~~~~~~~~~~~1111111', ordersResult,);

        // contents컬렉션에서 해당 item값을 찾아서
        const contentsResult = await db
          .collection('contents')
          .findOne({ _id: new ObjectId(req.query.itemId?.toString()) });

        // console.log('contentsResult~~~~~~~~~22222222', contentsResult);

        // const result = {
        // ...ordersResult,
        //   img_src: contentsResult?.img_src
        // }

        // orders컬렉션에서 찾은 값에 contents에서 찾은 값을 합쳐서 res에 보낼 result를 만듬
        const result = {
          ...contentsResult,
          totalQuantity: ordersResult?.totalQuantity,
          totalPrice: ordersResult?.totalPrice,
          status: ordersResult?.status,
          createdAt: ordersResult?.createdAt,
        };

        // console.log(result, 'result~~~~~~~~~~~~~~33333333');
        /*
        result= {
          _id: new ObjectId("6509b47802b7712df0cd3d53"),
          title: '상품1',
          img_src: 'https://github.com/limhada/frankenshop/blob/main/public/imgtest/1.jpeg?raw=true',
          author: 'q',
          price: 10000,
          description: '상품1의 내용',
          totalQuantity: 1,
          totalPrice: 10000,
          status: '결제대기',
          createdAt: 2024-01-07T16:45:06.932Z
        }
         */

        return res.status(200).json(result);
      }
      return res.status(500).json('서버 에러가 발생했습니다.');
    } catch (error) {
      console.log(error, '서버에러');
      return res.status(500).json('서버 에러가 발생했습니다.');
    }
  }
}
