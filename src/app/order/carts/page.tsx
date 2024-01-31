import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import SelectWithOptions from '../selectWithOptions';

// import ShippingAddress from '@/app/components/ShippingAddress';
import ShippingAddress from '../../components/ShippingAddress';
import OderItems from './oderItems';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
// TODO: 완료 - 주소검색 api 적용하기
// TODO: 고민 - 주소 처음 입력 시 db에 저장 후 마이페이지에 나타내기
// TODO: 고민 - 1개 미만의 수량 및 재고보다 큰 수량 구매제한
// TODO: +, - 버튼으로 수량 조절하기
// TODO: input에 값 직접 입력하여 수량 조절하기
// TODO: 마이페이지와 결제 페이지의 동일한 정보는 컴포넌트로 분리하여 재활용하기
// TODO: 결제 시 결제된 상품의 구매 수 1증가 하여 몽고db -> contents 컬렉션에 해당 상품 정보에 기록하기 (추후 많이 팔린 순 등의 정보에 사용하기 위함)
// TODO: 장바구니 체크박스에 체크된 상품의 총 결제 금액 및 수량 로직 활용하기

// TODO: oder/cart와 oder/detail의 결제 페이지 분리하여 작성하기 중복되는 부분이 있는지 확인하고 컴포넌트로 분리

/** 참고
 * https://codingmyoni.tistory.com/entry/React-%EC%83%81%ED%92%88%EC%9E%A5%EB%B0%94%EA%B5%AC%EB%8B%88-%EC%88%98%EB%9F%89-%EC%A1%B0%EC%A0%88-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0#article-2-3--3%EF%B8%8F%E2%83%A3-input%EC%97%90-%EC%A7%81%EC%A0%91-%EA%B0%92%EC%9D%84-%EC%9E%85%EB%A0%A5%ED%95%98%EC%97%AC-%EC%88%98%EB%9F%89-%EC%A1%B0%EC%A0%88%ED%95%98%EA%B8%B0
 */

import CryptoJS from 'crypto-js';
import Link from 'next/link';
import CartsPayment from '../../components/CartsPayment';

interface OderCartProps {
  searchParams: { _id: string };
}

interface Order {
  cartItemId: ObjectId;
  contents: ObjectId;
  checked: boolean;
  title: string;
  img_src: string;
  price: number;
  description: string;
  totalQuantity: number;
  totalPrice: number;
}

export interface OrderData {
  _id: ObjectId;
  status: string;
  email: string;
  orderPrice: number;
  createAt: Date;
  orders: Order[];
}

export default async function OderCart(props: OderCartProps) {
  let session = await getServerSession(authOptions);
  // console.log(session);

  // console.log('props= ~~~~~~~~', props.searchParams._id);

  const decodedId = decodeURIComponent(props.searchParams._id);

  // console.log('props= ~~~22222222', decodedId);

  const key = `${process.env.AES_KEY}`;

  // AES알고리즘 사용 복호화 ( 복구 키 필요 )
  const bytes = CryptoJS.AES.decrypt(decodedId, key);
  // console.log('복호화 된 값=', bytes);

  // 인코딩, 문자열로 변환, JSON 변환
  // const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  // console.log('인코딩, 문자열로 변환, JSON 변환 된 값=', decrypted);

  const db = (await connectDB).db('frankenshop');
  let result = await db
    .collection('ordersCart')
    .findOne({ _id: new ObjectId(decrypted) });

  // console.log('result ㅎㅇ~~~~~~~~~~~~~~~~= ', result);
  // console.log('result ㅎㅇ~~~~~~~~~~~~~~~~= ', result?.name);
  // console.log('result ㅎㅇ~~~~~~~~~~~~~~~~= ', result?.email);
  // console.log('result ㅎㅇ~~~~~~~~~~~~~~~~= ', result?.orderPrice);

  // console.log('result.orders.title ㅎㅇ~~~~~~~= ', result?.orders?.title)
  const ordersCartData = {
    name: result?.name,
    email: result?.email,
    orderPrice: result?.orderPrice,
    createAt: result?.createAt,
  };
  // console.log('ordersCartData= ~~~~~~', ordersCartData);

  return (
    <div>
      <h1 className='text-center text-[2rem] font-bold mb-5'> 결제하기</h1>
      {/* <hr className='mb-5 w-[50%] mx-auto'></hr> */}

      <OderItems result={result as OrderData}></OderItems>

      <h2 className='text-[1.25rem] font-bold mb-5 mt-[3rem]'>배송 정보</h2>
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

        {/* TODO: 선택가능 한 체크박스 & 직접입력으로 만들기 */}
      </div>

      <ShippingAddress></ShippingAddress>
      {/* <SelectWithOptions session={session}/> */}
      <SelectWithOptions />

      <div className='font-bold text-[2rem] text-myColor1 mr-[3rem] mt-5'>
        주문금액 {result?.orderPrice.toLocaleString()}원
      </div>

      <div className='mt-5'>
        <button className='w-[6rem] text-white h-[3rem] mr-[1rem] cursor-pointer overflow-visible p-2  border-5 border-gray-300 rounded-md bg-myColor1'>
          결제하기
        </button>

        {/* 장바구니 결제 */}
        {/* 결제 기능 들어간 버튼 */}
        <CartsPayment
          user={session.user}
          ordersCartData={ordersCartData}
        ></CartsPayment>

        {/* TODO: 진짜 취소하겠습니까? alert창 띄우기 */}
        <Link href='/'>
          <button className='w-[6rem] text-red-400 h-[3rem] cursor-pointer overflow-visible p-2 border-[0.3rem] border-red-400 rounded-md'>
            취소하기
          </button>
        </Link>
      </div>

      {/* TODO: 결제하기 버튼 클릭 시 가격 * 수량 = 총 가격 화면에 렌더링하기 */}
    </div>
  );
}
