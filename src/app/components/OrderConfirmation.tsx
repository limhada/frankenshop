import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';

/*
  TODO:
  1. 주문 정보:

  주문 번호
  주문 날짜
  주문 상태 (결제 완료, 배송 중, 배송 완료 등)
  결제 방식
  결제 금액
  배송 정보 (배송 주소, 택배 회사, 송장번호 등)
  2. 상품 정보:

  상품 이미지
  상품명
  상품 옵션 (색상, 사이즈 등)
  상품 수량
  상품 금액
  할인 금액
  쿠폰 사용 여부
 */
export default async function OrderConfirmation() {
  let session = await getServerSession(authOptions);
  // TODO: 몽고db에서 결제완료 된 상품정보 가져오기
  // ordersCompleted와 ordersCartCompleted 두 컬렉션에서 가져오기
  // 상세페이지 결제 상품과 장바구니 여러상품 결제의 db값이 다름! 상세페이지의 경우 상관x
  // 장바구니 페이지 결제 정보는 더보기 등을 클릭 시 결제한 상품의 정보 db에서 찾아서 보여주기

  const db = (await connectDB).db('frankenshop');
  const ordersResult = await db
    .collection('ordersCompleted')
    .find({ email: session?.user.email, status: '결제완료' })
    .toArray();

  // console.log('ㅎㅇ~~~~~~ordersResult= ', ordersResult);

  const ordersCartResult = await db
    .collection('ordersCartCompleted')
    .find({ email: session?.user.email, status: '결제완료' })
    .toArray();

  // console.log('ㅎㅇ~~~~~~ordersResult= ', ordersCartResult);

  return (
    <div>
      <h1>주문확인/배송조회</h1>
    </div>
  );
}
