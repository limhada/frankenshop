import { ObjectId } from 'mongodb';
import { connectDB } from '../../../../util/database';
import Image from 'next/image';

import Like from '@/app/components/like';

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
      
      <Like result={result} />
    </div>
  );
}
