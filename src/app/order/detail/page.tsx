import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import SelectWithOptions from '../selectWithOptions';
import ShippingAddress from '../../components/ShippingAddress';
import OderItems from './oderItems';
import Link from 'next/link';
import Price from './price';
import Payment from '../../components/Payment';

export default async function OderDetail() {
  let session = await getServerSession(authOptions);
  // console.log(session);

  // const name = 'cartsContents';
  // const query = cartsApi.useGetCartsQuery(name);

  // if(query.data)
  // console.log(query?.data, 'ㅎㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ');

  // const db = (await connectDB).db('frankenshop');
  // let result = await db
  // .collection('contents')
  // .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div>
      <h1 className='text-center text-[2rem] font-bold mb-5'> 결제하기</h1>

      <OderItems></OderItems>

      {/* <hr className='mb-5 w-[50%] mx-auto'></hr> */}

      <h2 className='text-[1.25rem] font-bold mb-5'>배송 정보</h2>
      <div>
        <ul>
          <li className='mb-[1.25rem]'>
            <div className='font-bold inline-block w-[6rem]'>이메일</div>
            <input
              type='text'
              value={session?.user.email}
              // id='detailAddress'
              placeholder='상세주소'
              readOnly
              className='w-[15rem] overflow-visible p-4 border mt-0.4rem border-gray-200 rounded-md bg-white text-base font-normal text-gray-900 disabled'
            />
          </li>
          <li className='mb-[1.25rem]'>
            <div className=' font-bold inline-block w-[6rem]'>이름</div>
            <input
              type='text'
              value={session?.user.name}
              // id='detailAddress'
              placeholder='상세주소'
              readOnly
              className='w-[15rem] overflow-visible p-4 border mt-0.4rem border-gray-200 rounded-md bg-white text-base font-normal text-gray-900 disabled'
            />
          </li>
        </ul>
      </div>

      <ShippingAddress></ShippingAddress>
      {/* <SelectWithOptions session={session}/> */}
      {/* TODO: 선택가능 한 체크박스 & 직접입력으로 만들기 */}
      <SelectWithOptions />

      {/* 주문금액 */}
      <Price></Price>

      <div className='mt-5 flex'>
        {/* 상세페이지 결제 */}
        <Payment user={session.user}></Payment>

        {/* TODO: 진짜 취소하겠습니까? alert창 띄우기 */}
        <Link href='/' replace>
          <button className='w-[6rem] text-red-400 h-[3rem] cursor-pointer overflow-visible p-2 border-[0.3rem] border-red-400 rounded-md'>
            취소하기
          </button>
        </Link>
      </div>
    </div>
  );
}
