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
  price: string;
  isLiked: boolean;
}

// 리팩토링 한 코드

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      let session = await getServerSession(req, res, authOptions);
      const db = (await connectDB).db('frankenshop');
      const contentsResult = await db.collection('contents').find().toArray();
      const likesResult = await db
        .collection('likes')
        .find({ email: session?.user.email })
        .toArray();
      const updateResult = contentsResult.map((item) => {
        const likeStatus = likesResult.find(
          (like) => like.contents.toString() === item._id.toString()
        );
        return {
          ...item,
          isLiked: likeStatus?.isLiked ?? false,
        };
      });

      return res.status(200).json(updateResult);
    } catch (error) {
      console.log(error, '서버에러');
    }
  }
}

// 기존 코드
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'GET') {
//     try {
//       let session = await getServerSession(req, res, authOptions);

//       const db = (await connectDB).db('frankenshop');
//       // let result = await db.collection<ListProps>('contents').find().toArray();
//       let contentsResult = await db.collection('contents').find().toArray();

//       console.log('데이터 확인', contentsResult);
//       /*
//       contentsResult = [
//         {
//           _id: new ObjectId('6509b47802b7712df0cd3d53'),
//           title: '상품1',
//           img_src:
//             'https://github.com/limhada/frankenshop/blob/main/public/imgtest/1.jpeg?raw=true',
//           author: 'q',
//           price: '10,000',
//           description: '상품1의 내용',
//         },
//       ];
//       */

//       let likesResult = await db
//         .collection('likes')
//         .find({ email: session?.user.email })
//         .toArray();

//       console.log(likesResult, 'ㅎㅇ~~~~~~~~~~~~~~~~~~likesResult');

//       const updateResult: ListProps[] = [];

//       // likesResult를 기반으로 result 배열을 업데이트
//       contentsResult.forEach((item) => {
//         // 현재 아이템의 _id와 일치하는 likesResult 항목 찾기
//         const likeStatus = likesResult.find(
//           (like) => like.contents.toString() === item._id.toString()
//         );

//         // 만약 일치하는 항목을 찾았다면 isLiked를 업데이트하고 새로운 데이터에 추가
//         if (likeStatus) {
//           const updatedItem: ListProps = {
//             _id: item._id,
//             title: item.title,
//             description: item.description,
//             img_src: item.img_src,
//             author: item.author,
//             price: item.price,
//             isLiked: likeStatus.isLiked,
//           };

//           updateResult.push(updatedItem);
//         } else {
//           // 일치하는 항목을 찾지 못했다면 isLiked를 기본값인 false로 설정

//           // 기존 타입스크립트 에러발생 코드
//           // updateResult.push({
//           //   ...item,
//           //   isLiked: false,
//           // });
//           const defaultItem: ListProps = {
//             _id: item._id,
//             title: item.title,
//             description: item.description,
//             img_src: item.img_src,
//             author: item.author,
//             price: item.price,
//             isLiked: false,
//           };

//           updateResult.push(defaultItem);
//         }
//       });
//       console.log(updateResult, 'updateResult~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

//       return res.status(200).json(updateResult);
//       // return res.status(200).json('allContents 서버 응답 테스트 성공');
//     } catch (error) {
//       console.log(error, '서버에러');
//     }
//   }
// }
