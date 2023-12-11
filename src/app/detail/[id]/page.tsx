import { ObjectId } from 'mongodb';
import { connectDB } from '../../../../util/database';
import Image from 'next/image';

import LikeButton from './likeButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import Link from 'next/link';
import QuantityButton from '@/app/components/QuantityButton';
import CartIcon from '@/app/components/CartIcon';

// TODO: 결제하기 버튼 클릭 시 결제 api 로 request 하기
// TODO: 장바구니 재사용 가능하게 별도 컴포넌트로 분리해서 재사용하기

interface DetailProps {
  params: {
    id: string;
  };
}

export default async function Detail(props: DetailProps) {
  console.log(props.params.id, '= props.params.id~~~~~~~~~'); // props.params.id는 detail/[id] 에서 id 값임

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
    // result.email = session.user.email;
  }

  return (
    <div>
      상세페이지
      {/* TODO: 상세페이지 디자인 추가하기 */}
      <h2>제목: {result?.title}</h2>
      <Image
        src={result?.img_src}
        alt={result?.title}
        // priority 비활성화 시 경고 메세지 : was detected as the Largest Contentful Paint (LCP). Please add the "priority"
        priority={true}
        width={200}
        height={200}
        // style={{ height: 100 }} // 이미지 세로 크기 조절
      />
      <div>내용: {result?.description}</div>
      <div>가격: {result?.price}</div>
      {/* 좋아요 버튼 */}
      <LikeButton result={result} />
      {/* 장바구니 버튼 */}
      {/*  TODO: 아이콘으로 변경하기 */}
      <div>장바구니 추가</div>
      <CartIcon itemId={result?._id.toString()}></CartIcon>
      <QuantityButton></QuantityButton>
      <Link href='/order/detail' className=' bg-slate-600'>
        결제하기
      </Link>
    </div>
  );
}
