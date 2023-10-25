import { ObjectId } from 'mongodb';
import { connectDB } from '../../../util/database';
import Contents from './Contents';
import ImageComponent from './ImageComponent';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

export interface ListProps {
  _id: ObjectId;
  title: string;
  description: string;
  img_src: string;
  author: string;
  price: string;
  isLiked: boolean; 
}

export default async function Mainpage() {
  const client = await connectDB;
  const db = client.db('frankenshop');



  // TODO: 중요 - likeChange.tsx에 똑같은 코드 있음 중복을 줄이기 위한 해결방법 찾고 개선하기
  let result = await db.collection<ListProps>('contents').find().toArray();

  // console.log(result, 'result');

  ////////////////////////////////////////////////////////

  let session = await getServerSession(authOptions);

  let likesResult = await db
    .collection('likes')
    .find({ email: session?.user.email })
    .toArray();

  // console.log(likesResult,'ㅎㅇ~~~~~~~~~~~~~~~~~~likesResult');



  // 받아온 result 값에 isLiked 값을 추가한 데이터
  const updateResult: ListProps[] = [];

  // likesResult를 기반으로 result 배열을 업데이트
  result.forEach((item) => {
    // 현재 아이템의 _id와 일치하는 likesResult 항목 찾기
    const likeStatus = likesResult.find(
      (like) => like.contents.toString() === item._id.toString()
    );

    // 만약 일치하는 항목을 찾았다면 isLiked를 업데이트하고 새로운 데이터에 추가
    if (likeStatus) {
      updateResult.push({
        ...item,
        isLiked: likeStatus.isLiked,
      });
    } else {
      // 일치하는 항목을 찾지 못했다면 isLiked를 기본값인 false로 설정
      updateResult.push({
        ...item,
        isLiked: false,
      });
    }
  });
  // console.log(updateResult, 'updateResult~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

  return (
    <div>
      <ImageComponent />
      <Contents result={updateResult} />
    </div>
  );
}
