'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { ObjectId } from 'mongodb';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncContents,
  likeChange,
  likeToggle,
} from '@/app/redux/features/contentsSlice';
import { RootState } from '@/app/redux/store';
import Link from 'next/link';
import axios from 'axios';
import { cartsApi } from '@/app/redux/apis/cartsApi';
import { paymentApi } from '@/app/redux/apis/paymentApi';

interface OrderButtonProps {
  _id: string;
}

export default function OderButton({ _id }: OrderButtonProps) {
  const quantity = useSelector((state: RootState) => state.cart.quantity);
  // console.log(quantity, 'quantity');
  // console.log(_id, '_id ㅎㅇ~~~~~~~~~~~~~~~');


  const [payment] = paymentApi.usePaymentMutation()



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
          payment({_id, quantity})
        }}
      >
        결제하기
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
