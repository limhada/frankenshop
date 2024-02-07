import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import Image from 'next/image';

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

  // TODO: 상품 결제 완료 시 저장되는 db 정보에 이미지 url 정보도 함께 저장해야 될지 고민해보기
  const ordersResult = await db
    .collection('ordersCompleted')
    .find({ email: session?.user.email, status: '결제완료' })
    .toArray();

  console.log('ㅎㅇ~~~~~~ordersResult= ', ordersResult);

  const ordersCartResult = await db
    .collection('ordersCartCompleted')
    .find({ email: session?.user.email, status: '결제완료' })
    .toArray();

  // console.log('ㅎㅇ~~~~~~ordersResult= ', ordersCartResult);

  return (
    <div>
      <h1>주문확인/배송조회</h1>

      <div>
        {/* {ordersResult.map((el: any, i: number) => (
          <div key={`OderItem_${el.cartItemId}`} className='flex'>
            <div className='w-[90%] shadow-md bg-white rounded-md p-5 mb-[0.3rem] opacity-100 transition-all duration-1000'>
              <table className='w-full border-collapse border border-gray-300'>
                <thead></thead>
                <tbody>
                  <tr>
                    <th className='border p-4 w-1/5' rowSpan={2}>
                      <div className='flex items-center justify-center'>
                        <Image
                          src={el.img_src}
                          width={100}
                          height={100}
                          alt='상품 이미지'
                        />
                      </div>
                    </th>
                    <th className='p-4 text-center w-2/5 border-b'>상품명</th>
                    <th className='p-4 text-center w-1/6 border-b'>수량</th>
                    <th className='p-4 text-center w-1/6 border-b'>가격</th>
                    <th className='p-4 text-center w-1/6 border-b'>상태</th>
                  </tr>

                  <tr>
                    <td className='p-4 text-center'>{el.title}</td>
                    <td className='p-4 text-center'>{el.totalQuantity}</td>
                    <td className='p-4 text-center'>
                      {el.totalPrice.toLocaleString()}
                    </td>
                    <td className='p-4 text-center'>{el.status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}
