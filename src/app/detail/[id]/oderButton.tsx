'use client';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { paymentApi } from '../../redux/apis/paymentApi';
import { useRouter } from 'next/navigation';
import { setOrder } from '../../redux/features/orderSlice';

interface OrderButtonProps {
  itemId: string;
}

export default function OderButton({ itemId }: OrderButtonProps) {
  const quantity = useSelector((state: RootState) => state.cart.quantity);
  // console.log(quantity, 'quantity');
  // console.log(_id, '_id ㅎㅇ~~~~~~~~~~~~~~~');

  const [payment] = paymentApi.usePaymentMutation();

  const router = useRouter();

  const dispatch = useDispatch();

  return (
    <div>
      {/* <Link
      // href={`/order/detail?quantity=${quantity}`} // Test 컴포넌트에 사용
      href={`/order/detail`}
      > */}
      <button
        // onClick={()=> {console.log('ㅎㅇ');}}
        className='text-white h-[3rem] cursor-pointer overflow-visible p-1 border-1 border-gray-300 rounded-md bg-myColor1'
        onClick={() => {
          payment({ itemId, quantity })
            .then((r) => {
              // console.log('결과~~~~~~~~~' , r);

              // 서버처리 성공 시 -> 결제/상세페이지로 이동
              if ('data' in r && r.data) {
                // console.log('추가된 문서 _id:', r.data._id);
                // console.log('~~~~~~~~ 추가된 문서 totalPrice:', r.data.totalPrice);

                // 추가된 문서의 _id와 itemId를 store에 저장 -> /order/detail 페이지에서 꺼내서 각 주문서를 구별할 때 사용!
                dispatch(setOrder({ _id: r.data._id, itemId, totalPrice: r.data.totalPrice })); // r. data는 추가된 문서 _id, itemId는 현재 상품의 _id값
                router.push('/order/detail');

                // router.push('/order/detail?q=테스트~');
              }
            })
            .catch((error) => {
              console.error('에러 발생:', error);
            });
        }}
      >
        구매하기
      </button>

      {/* form으로 전송 시 서버에서 바로 리다이렉트 가능!

      <form action='/api/order/payment' method='GET'>
        <input
          name='_id'
          defaultValue={_id}
          className='block w-full p-2 mb-2 border rounded-lg'
        />
        <input
          name='content'
          defaultValue={quantity}
          className='block w-full p-2 mb-2 border rounded-lg'
        />

        <button
          type='submit'
          className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'
        >
          결제하기 2
        </button>
      </form> */}

      {/* </Link> */}
    </div>
  );
}
