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

      // db의 contents컬렉션에서 id에 해당하는 상품 정보 검색

      const db = (await connectDB).db('frankenshop');
      let result = await db
        .collection('contents')
        .findOne({ _id: new ObjectId(req.query._id as string) });
      // console.log("likeState-api - likesResult ㅎㅇ~~~~~~~~~", likesResult);

      // db의 likes컬렉션에서 현재 로그인된 사용자의 이메일과 id에 해당하는 상품 정보가 일치하는
      let likesResult = await db.collection('likes').findOne({
        email: session?.user.email,
        contents: new ObjectId(result?._id.toString()),
      });

      // console.log('likesResult ㅎㅇ~~~~~~~~~', likesResult);

      // result에 해당 제품의 isLiked값 추가
      if (result) {
        result.isLiked = likesResult?.isLiked;
        // result.email = session.user.email;
      }

      // console.log('result ㅎㅇ~~~~~~', result);

      /*
result = {
  _id: new ObjectId("6509b47802b7712df0cd3d53"),
  title: '상품1',
  img_src: 'https://github.com/limhada/frankenshop/blob/main/public/imgtest/1.jpeg?raw=true',
  author: 'q',
  price: '10,000',
  description: '상품1의 내용',
  isLiked: true
}
*/

      // result에 담겨있는 상품 정보에 likesResult에서 가져온 isLiked값을 result에 추가하기
      return res.status(200).json(result);
      // return res.status(200).json('테스트 성공');
    } catch (error) {
      console.log(error, '서버에러');
    }
  }
}
