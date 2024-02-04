import { ObjectId } from 'mongodb';
import { connectDB } from '../../../../util/database';
import Image from 'next/image';

import LikeButton from './likeButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';

// import CartIcon from '@/app/components/CartIcon';
import CartIcon from '../../components/CartIcon';

// import QuantityInput from '@/app/detail/[id]/quantityInput';
import QuantityInput from '../../detail/[id]/quantityInput';
import OrderButton from './orderButton';

// TODO: 결제하기 버튼 클릭 시 결제 api 로 request 하기
// TODO: 장바구니 재사용 가능하게 별도 컴포넌트로 분리해서 재사용하기

interface DetailProps {
  params: {
    id: string;
  };
}

export default async function Detail(props: DetailProps) {
  // console.log(props.params.id, '= props.params.id~~~~~~~~~'); // props.params.id는 detail/[id] 에서 id 값임

  // db의 contents컬렉션에서 id에 해당하는 상품 정보 검색
  const db = (await connectDB).db('frankenshop');
  let result = await db
    .collection('contents')
    .findOne({ _id: new ObjectId(props.params.id) });

  // console.log(result?._id.toString(), 'result?._id.toString() ㅎㅇ~~~~~~~~~~~');

  let session = await getServerSession(authOptions);

  // db의 likes컬렉션에서 현재 로그인된 사용자의 이메일과 id에 해당하는 상품 정보가 일치하는
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
      {/* TODO: 상세페이지 디자인 추가하기 */}
      <h2>{result?.title}</h2>
      <Image
        src={result?.img_src}
        alt={result?.title}
        // priority 비활성화 시 경고 메세지 : was detected as the Largest Contentful Paint (LCP). Please add the "priority"
        priority={true}
        width={200}
        height={200}
        // style={{ height: 100 }} // 이미지 세로 크기 조절
      />
      <div>{result?.description}</div>
      <div>가격: {result?.price.toLocaleString()}</div>
      {/* 좋아요 버튼 */}
      <div className='flex items-center'>
        <LikeButton />
        {/* 장바구니 버튼 */}
        {/*  TODO: 아이콘으로 변경하기 */}
        <CartIcon _id={result?._id.toString()} type={'detail'}></CartIcon>
     </div>
      {/* <QuantityButton></QuantityButton> */}
      <QuantityInput></QuantityInput>
      <br />
      {/* <Link
        href='/order/detail'
      >
        결제하기
      </Link> */}
      <OrderButton itemId={result?._id.toString() || ''}></OrderButton>
    </div>
  );
}
