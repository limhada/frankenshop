import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import OrderConfirmation from '../components/OrderConfirmation';

export default async function Mypage() {
  let session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <div>
      <h1 className='text-[2rem] inline-block font-bold mb-5'>마이 페이지</h1>

      <ul className='mb-[1.25rem]'>
        <li className='w-full overflow-visible p-4 border mt-[0.4rem] border-gray-200 rounded-md bg-white text-base font-normal text-gray-900'>
          아이디(이메일): {session.user.email}
        </li>
        <li className='w-full overflow-visible p-4 border mt-[0.4rem] border-gray-200 rounded-md bg-white text-base font-normal text-gray-900'>
          이름: {session.user.name}
        </li>
        {/* TODO: 비밀번호 수정 기능 추가하기 */}
      </ul>

      <OrderConfirmation></OrderConfirmation>

      {/* TODO: 아래 항목 기능 구현하기 */}
      {/* <div className='w-full overflow-visible p-4 border mt-[0.4rem] border-gray-200 rounded-md bg-white text-base font-normal text-gray-900'>
        비밀번호 변경
      </div>
      <ShippingAddress></ShippingAddress>

      <div>주문 내역</div>

      <div>배송지 내역(배송중 or 배송 완료)</div>
      <div>장바구니</div>
      <div>리뷰작성</div>
      <div>보유쿠폰</div>
      <div>포인트</div>
      <div>Q&A</div>

      <span className='relative'>
        <h1>
          ㅇㅁㄴ
          <span className='absolute top-[0.1rem] w-2 h-2 bg-red-500 rounded-full'></span>
        </h1>
      </span> */}
    </div>
  );
}
