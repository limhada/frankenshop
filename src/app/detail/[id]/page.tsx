import { ObjectId } from 'mongodb';
import { connectDB } from '../../../../util/database';
import Comment from './Comment';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { notFound } from 'next/navigation';

interface DetailProps {
  params: {
    id: string;
  };
}
// interface를 사용하지 않고 가능함 하지만 확장성이 불편하여 비추천
// export default async function Detail(props: { params: { id: string}}) {
export default async function Detail(props: DetailProps) {
  const db = (await connectDB).db('frankenshop');
  let result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(props.params.id) });
  // db에서 받아온 데이터 확인
  // console.log("데이터확인", result)

  // props의 params값 확인
  // console.log(props.params.id);
  let session = await getServerSession(authOptions);

  // 잘못된 상세페이지로 접속 시 notFound 추가
  if (result === null) {
    return notFound();
  }

  return (
    <div>
      <h4>상세 페이지</h4>
      <h2>제목: {result?.title}</h2>
      <div>내용: {result?.content}</div>
      <img src={result?.img_src} />
      {/* <div>{props.params.id}</div> */}
      <Comment _id={result?._id?.toString() || ''} session={session} />
    </div>
  );
}
