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

// TODO: 해결 - 1번유저가 장바구니에 추가한 아이템은  2번 유저의 장바구니에 추가 안되는 문제 해결하기
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
            </div>
            <div className='flex'>
              <button
                // FIXME: 수량 증가 및 감소 버튼 onClick시 로직 함수화 하기 현재 +와 -에서 두번 중복 사용중임
                onClick={(e) => {
                  axios
                    .post('/api/contents/quantityUpdate', {
                      increase: 1,
                      _id: el._id.toString(),
                    })
                    .then((r) => {
                      //  console.log(r.data);
                      // el.quantity = r.data
                      setCartList((prevCartList) => {
                        const updatedCartList = prevCartList.map((cartItem) => {
                          if (cartItem._id === el._id) {
                            // 현재 항목의 _id와 일치하는 경우 수량을 업데이트
                            return { ...cartItem, quantity: r.data };
                          }
                          return cartItem;
                        });
                        return updatedCartList;
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                +
              </button>
              <div>수량: {el.quantity}</div>

              <button
                onClick={(e) => {
                  axios
                    .post('/api/contents/quantityUpdate', {
                      decrease: -1,
                      _id: el._id.toString(),
                    })
                    .then((r) => {
                      //  console.log(r.data);
                      // el.quantity = r.data
                      setCartList((prevCartList) => {
                        const updatedCartList = prevCartList.map((cartItem) => {
                          if (cartItem._id === el._id) {
                            // 현재 항목의 _id와 일치하는 경우 수량을 업데이트
                            return { ...cartItem, quantity: r.data };
                          }
                          return cartItem;
                        });
                        return updatedCartList;
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                -
              </button>
            </div>
            <button
              onClick={(e) => {
                // 버튼의 부모 요소를 찾기
                const target = (e.target as HTMLElement).parentElement;
                // console.log('ㅎㅇ~~~~~~~~~~~~~~~~~~~~~~~~~', target);
                // FIXME: axios로 삭제 버튼 api 만들고 axios.delete로 코드 변경하기
                axios
                  .delete(`/api/contents/delete`, { data: el._id.toString() })
                  .then((r) => {
                    // api요청으로 삭제 성공 시 화면에서 삭제한 상품 안보이게하는 로직
                    if (r.status === 200 && target) {
                      target.style.opacity = '0';
                      setTimeout(() => {
                        target.style.display = 'none';
                      }, 1000);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
