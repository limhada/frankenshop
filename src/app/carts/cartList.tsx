'use client';

import axios from 'axios';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import { useState } from 'react';

// TODO: 할인쿠폰
// TODO: 결제정보
// TODO: 포인트

// TODO: 장바구니에서 상품 삭제
// TODO: 수량 증감
// TODO: 총 결제 금액 // 할인금액 // 배송비 등
// TODO: 결제하기 버튼
// TODO: 전체 선택 및 부분 선택을 위한 체크박스
// TODO: 전체선택( 3 / 3 ) 전체삭제 선택된 상품 삭제 버튼

// TODO: 각 제품에 배송비 여부 추가하기

// TODO: 01옵션선택 > 02장바구니 > 03주문/결제 > 04주문완료 진행현황 표시하기

export interface CartProps {
  cartData: {
    _id: ObjectId;
    title: string;
    description: string;
    img_src: string;
    author: string;
    price: string;
    like: boolean;
    quantity: number;
  }[];
}

export default function CartList({ cartData }: CartProps) {
  // console.log(cartData);
  // console.log(cartData[0]);
  // const t = JSON.parse(cartData)

  const [cartList, setCartList] = useState(cartData);

  return (
    <div>
      {/* 데이터 확인용 {JSON.stringify(cartList)} */}
      <div className='p-2 bg-gray-100'>
        {cartList.map((el, i) => (
          <div key={i} className='flex'>
            <div className='w-[90%] shadow-md bg-white rounded-md p-5 mb-3 opacity-100 transition-all duration-1000'>
              <h3>이름: {el.title}</h3>
              <Image
                src={el.img_src}
                width={100}
                height={100}
                alt='상품 이미지'
              />
              <p>가격 {el.price}</p>
              <p>수량: {el.quantity}</p>
            </div>
            <button onClick={(e) => {
                  
                  // axios({
                  //   url: '/api/post/delete',
                  //   method: 'DELETE',
                  //   data: result[i]._id.toString(),
                  // })
                  //   .then((r) => {
                  //     // console.log(r.status);
                  //     if (r.status === 200 && target) {
                  //       // console.log("확인");
                  //       target.style.opacity = '0';
                  //       setTimeout(() => {
                  //         target.style.display = 'none';
                  //       }, 1000);
                  //     }
                  //   })
                  //   .catch((error) => {
                  //     console.log(error);
                  //     // console.log(error.request.status);
                  //     // console.log(error.request.response);
                  //     if (error.request.status) {
                  //       // FIXME: request가 아닌 response를 사용해야 되나???
                  //       // alert("권한이 없습니다.")
                  //       alert(JSON.parse(error.request.response));
                  //     }
                  //   });

                }}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}
