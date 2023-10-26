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
    console.log(req.body._id, 'req.body ㅎㅇ~~~~~~~~~~~~~~~~~~');

    try {
      let session = await getServerSession(req, res, authOptions);

      // console.log(session);

      // 상세페이지 좋아요 로직 구현중
      // TODO: 처음 좋아요 누르면 insertData 추가하고 처음 좋아요가 아니면 기존 isLiked값을 반전시키고 db에 업데이트
      const insertData = {
        contents: new ObjectId(req.body._id),
        email: session.user.email,
        isLiked: true,
      };
      
      const db = (await connectDB).db('frankenshop');

      let result = await db.collection('likes').findOne({
        contents: new ObjectId(req.body._id),
        email: session.user.email,
      });
      console.log('result ㅎㅇ~~~~~~~~~~', result);

      if (result === null) {
        await db.collection('likes').insertOne(insertData);
        console.log('처음 데이터 추가해야 됨~~~~~~~~~~~');
      } else if (result !== null) {
        console.log('이미 있음 데이터 수정 ~~~~~~~~~~~~~');
          const updateResult = await db
            .collection('likes')
            .updateOne(
              { contents: new ObjectId(req.body._id), email: session.user.email },
              { $set: { isLiked: !result.isLiked } }
            );
      }

      // 컨텐츠 컬렉션에서 해당 컨텐츠 찾기
      let contentsResult = await db.collection('contents').findOne({
      _id: new ObjectId(result?.contents),
      });

      console.log('contentsResult ㅎㅇ~~~~~~~~~~', contentsResult);


      let likedResult = await db.collection('likes').findOne({
        contents: new ObjectId(req.body._id),
        email: session.user.email,
      });

      console.log(likedResult?.isLiked, "liked~~~~~~~~~~~~~`");

      // 해당 컨텐츠에 좋아요 정보 추가해서 클라이언트로 반환할 정보 만들기
      if (contentsResult) {
        contentsResult.isLiked = likedResult?.isLiked
      }
      // console.log('최종 정보~~~~~~~~~', contentsResult);
      

      return res.status(200).json(contentsResult);
      // return res.status(200).json('성공');
    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
