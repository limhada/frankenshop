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
    console.log('likeChange api ㅎㅇ~~', req.body._id); // req.body -> 현재 제품의 _id
    // likeChange api ㅎㅇ~~ 6509b47802b7712df0cd3d53
    let session = await getServerSession(req, res, authOptions);
    // console.log('회원정보 확인~~~~~~~~~~~~', session.user.email);

    const insertData = {
      contents: new ObjectId(req.body._id),
      email: session.user.email,
      isLiked: true,
    };

    try {
      const db = (await connectDB).db('frankenshop');

      let result = await db
        .collection('likes')
        .find({
          contents: new ObjectId(req.body._id),
          email: session.user.email,
        })
        .toArray();

      // console.log('ㅎㅇ~~~~~~~~~~', result);
      if (result.length === 0) {
        await db.collection('likes').insertOne(insertData);
        // console.log('처음 데이터 추가 완료');
      } else if (result.length > 0) {
        // console.log('ㅎㅇ222222222~~~',result[0].isLiked);
        const updateResult = await db
          .collection('likes')
          .updateOne(
            { contents: new ObjectId(req.body._id), email: session.user.email },
            { $set: { isLiked: !result[0].isLiked } }
          );
      }

      // let updateResult = await db
      //   .collection('likes')
      //   .find({ email: session?.user.email })
      //   .toArray();
      // // console.log('장바구니에 추가된 값 확인~~~~~~~~~~~~~~~', updateResult);


      // TODO: 정리 - 기존 로직 몽고db에 업데이트 한 값 다시 결과로 반환하는 로직
      // let contentsResult = await db.collection('contents').find().toArray();

      // let likesResult = await db
      //   .collection('likes')
      //   .find({ email: session?.user.email })
      //   .toArray();

      // // console.log(likesResult,'ㅎㅇ~~~~~~~~~~~~~~~~~~likesResult');

      // // 받아온 contentsResult 값에 isLiked 값을 추가한 데이터
      // const updateLikeResult: any = [];

      // // likesResult를 기반으로 contentsResult 배열을 업데이트
      // contentsResult.forEach((item) => {
      //   // 현재 아이템의 _id와 일치하는 likesResult 항목 찾기
      //   const likeStatus = likesResult.find(
      //     (like) => like.contents.toString() === item._id.toString()
      //   );

      //   // 만약 일치하는 항목을 찾았다면 isLiked를 업데이트하고 새로운 데이터에 추가
      //   if (likeStatus) {
      //     updateLikeResult.push({
      //       ...item,
      //       isLiked: likeStatus.isLiked,
      //     });
      //   } else {
      //     // 일치하는 항목을 찾지 못했다면 isLiked를 기본값인 false로 설정
      //     updateLikeResult.push({
      //       ...item,
      //       isLiked: false,
      //     });
      //   }
      // });

      // return res.status(200).json(updateLikeResult);

      return res.status(200).json('성공');
    } catch (error) {
      console.log('에러!', error);
      return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  }
}
