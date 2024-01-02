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



export default function OderButton() {
  
  const quantity = useSelector((state: RootState) => state.cart.quantity);
// console.log("quantity", quantity);


  return (
    <div>
      <Link
      // href={`/order/detail?quantity=${quantity}`} // Test 컴포넌트에 사용
      href={`/order/detail`}
      >
      <button
        // onClick={()=> {console.log('ㅎㅇ');}}
        className="text-white h-[3rem] cursor-pointer overflow-visible p-1 border-1 border-gray-300 rounded-md bg-myColor1"
        >
        결제하기
        
      </button>
        </Link>
    </div>
  );
}
