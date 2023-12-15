import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../util/database';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../auth/[...nextauth]';

// export interface ListProps {
//   _id: ObjectId;
//   title: string;
//   description: string;
//   img_src: string;
//   author: string;
//   price: string;
//   isLiked: boolean;
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // let session = await getServerSession(req, res, authOptions);

      const db = (await connectDB).db('frankenshop');
      // let result = await db.collection<ListProps>('contents').find().toArray();
      let result = await db.collection('contents').find().toArray();

      console.log('데이터 확인', result);
      /*
      result = [
        {
          _id: new ObjectId('6509b47802b7712df0cd3d53'),
          title: '상품1',
          img_src:
            'https://github.com/limhada/frankenshop/blob/main/public/imgtest/1.jpeg?raw=true',
          author: 'q',
          price: '10,000',
          description: '상품1의 내용',
        },
        {
          _id: new ObjectId('65254cdcbbca6b503b707627'),
          title: '상품2',
          img_src:
            'https://github.com/limhada/frankenshop/blob/main/public/imgtest/1.jpeg?raw=true',
          author: 'q',
          price: '12,000',
          description: '상품2의 내용',
        },
      ];
      */

      return res.status(200).json(result);
      // return res.status(200).json('allContents 서버 응답 테스트 성공');
    } catch (error) {
      console.log(error, '서버에러');
    }
  }
}
