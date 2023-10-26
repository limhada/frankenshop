import { ObjectId } from 'mongodb';
import { connectDB } from '../../../../util/database';
import Image from 'next/image';

import LikeButton from './likeButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';

interface DetailProps {
  params: {
    id: string;
  };
}

export default async function Detail(props: DetailProps) {
  // console.log(props.params.id); // props.params.id는 detail/[id] 에서 id 값임

  const db = (await connectDB).db('frankenshop');
  let result = await db
    .collection('contents')
    .findOne({ _id: new ObjectId(props.params.id) });

  // console.log(result?._id.toString(), 'result?._id.toString() ㅎㅇ~~~~~~~~~~~');

  let session = await getServerSession(authOptions);

  let likesResult = await db.collection('likes').findOne({
    email: session?.user.email,
    contents: new ObjectId(result?._id.toString()),
  });

  // result에 해당 제품의 isLiked값 추가
  if (result) {
    result.isLiked = likesResult?.isLiked;
    result.email = session.user.email
  }

  return (
    <div>
      상세페이지
      {/* TODO: 상세페이지 디자인 추가하기 */}
      <h2>제목: {result?.title}</h2>
      <Image
        src={result?.img_src}
        alt={result?.title}
        width={200}
        height={200}
        // style={{ height: 100 }} // 이미지 세로 크기 조절
      />
      <div>내용: {result?.description}</div>
      <div>가격: {result?.price}</div>
      {/* <LikeChange result={result} /> */}
      <LikeButton result={result} />
    </div>
  );
}
