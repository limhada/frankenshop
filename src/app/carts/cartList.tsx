'use client';

import axios from 'axios';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import { useState, useEffect } from 'react';
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
    checked: boolean;
  }[];
}

export default function CartList({ cartData }: CartProps) {
  const [cartList, setCartList] = useState(cartData);
  const [allChecked, setAllChecked] = useState(false); // 전체 선택 체크박스 상태
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // 총 결제 금액을 업데이트하는 함수
    const updateTotalPrice = () => {
      const totalPrice = cartList
        .filter((item) => item.checked)
        .reduce(
          (total, item) =>
            total + parseFloat(item.price.replace(',', '')) * item.quantity,
          0
        );
      setTotalPrice(totalPrice);
    };

    // 초기 총 결제 금액 설정
    updateTotalPrice();
  }, [cartList]);

  const handleAllCheckboxChange = () => {
    setAllChecked(!allChecked); // 전체 선택 체크박스의 상태를 토글

    // 현재 장바구니 데이터를 업데이트합니다.
    setCartList((prevCartList) => {
      const updatedCartList = prevCartList.map((cartItem) => ({
        ...cartItem,
        checked: !allChecked,
      }));

      setTotalPrice(
        updatedCartList
          .filter((item) => item.checked)
          .reduce(
            (total, item) =>
              total + parseFloat(item.price.replace(',', '')) * item.quantity,
            0
          )
      );

      return updatedCartList;
    });
  };

  const handleCheckboxChange = (el: any) => {
    const updatedCartList = cartList.map((cartItem) => ({
      ...cartItem,
      checked: cartItem._id === el._id ? !cartItem.checked : cartItem.checked,
    }));
    setCartList(updatedCartList);
  };

  const handleQuantityChange = async (el: any, action: number) => {
    const actionStr = action > 0 ? 'increase' : 'decrease';
    try {
      const response = await axios.post('/api/contents/quantityUpdate', {
        [actionStr]: action,
        // TODO: 객체 문법 정리하기
        _id: el._id.toString(),
      });
      const updatedCartList = cartList.map((cartItem) => ({
        ...cartItem,
        quantity: cartItem._id === el._id ? response.data : cartItem.quantity,
      }));
      setCartList(updatedCartList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (el: any) => {
    axios
      .delete(`/api/contents/delete`, { data: el._id.toString() })
      .then((r) => {
        if (r.status === 200) {
          const updatedCartList = cartList.filter(
            (item) => item._id !== el._id
          );
          setCartList(updatedCartList);

          // 해당 요소를 1초 후에 숨기도록 설정
          // setTimeout(() => {
          // TODO: 1초 후 자연스럽게 장바구니 상품 삭제되게 수정하기
          //   const target = document.getElementById()
          //   if (target) {
          //     target.style.display = 'none';
          //   }
          // }, 1000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className='p-2 bg-gray-100'>
        <div>
          <input
            type='checkbox'
            checked={allChecked}
            onChange={handleAllCheckboxChange}
          />
          전체선택
        </div>
        {cartList.map((el, i) => (
          <div key={i} className='flex'>
            <input
              type='checkbox'
              checked={el.checked}
              onChange={() => handleCheckboxChange(el)}
            />
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
              {/* FIXME: 해결 - 수량 증가 및 감소 버튼 onClick시 로직 함수화 하기 현재 +와 -에서 두번 중복 사용중임 */}
              <button onClick={() => handleQuantityChange(el, 1)}>+</button>
              <div>수량: {el.quantity}</div>
              <button onClick={() => handleQuantityChange(el, -1)}>-</button>
            </div>
            <button onClick={() => handleDelete(el)}>X</button>
          </div>
        ))}
      </div>
      <div>총 결제 금액: {totalPrice}</div>
    </div>
  );
}
