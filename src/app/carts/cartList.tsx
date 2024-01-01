'use client';

import axios from 'axios';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import QuantityInput from '../components/QuantityInput';
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

// TODO: 중요 - 선택삭제 및 전체 삭제 추가하기

// TODO: 고민 - 장바구니 각 상품 별 주문하기 버튼 추가할지?
// TODO: 고민 - 01옵션선택 > 02장바구니 > 03주문/결제 > 04주문완료 진행현황 표시하기

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
    // 체크박스 n번의 체크 상태를 false로 변경
    const updatedCartList = cartList.map((cartItem) => ({
      // cartList 배열에서 체크박스 n번의 상태를 false로 변경한 배열
      ...cartItem,
      checked: cartItem._id === el._id ? !cartItem.checked : cartItem.checked,
    }));

    // 체크박스 n번의 체크를 해제하면 전체선택 체크박스의 체크도 해제되는 로직
    // 전체 선택 체크박스의 상태를 업데이트합니다.
    const updatedAllChecked = updatedCartList.every((item) => item.checked);
    // updatedCartList 배열의 모든 항목의 checked 속성의 값이 true인지 여부를 나타냄
    setAllChecked(updatedAllChecked);
    // allChecked 상태 변수의 값을 updatedAllChecked 변수의 값으로 변경

    setCartList(updatedCartList);
    // cartList 상태 변수의 값을 updatedCartList 배열로 변경
  };

  const handleQuantityChange = async (el: any, action: number) => {
    const actionStr = action > 0 ? 'increase' : 'decrease';
    try {
      const response = await axios.post('/api/contents/quantityUpdate', {
        [actionStr]: action, // TODO: 객체 문법 정리하기
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
          const target = document.getElementById(`carList-${el._id}`);
          if (target) {
            // 1초 후에 투명도를 조절하고 display를 변경합니다.

            target.style.opacity = '0';
            target.style.transition = 'opacity 0.4s';

            setTimeout(() => {
              target.style.display = 'none';
              setCartList(updatedCartList);
            }, 400);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteSelected = () => {
    // 체크된 항목만 필터링
    const selectedItems = cartList.filter((item) => item.checked);
    if (selectedItems.length === 0) {
      // 체크된 항목이 없으면 아무 작업도 수행하지 않음
      return;
    }

    // 선택된 항목들의 _id 값을 배열로 추출
    const selectedIds = selectedItems.map((item) => item._id);

    // 서버로 선택된 항목들을 삭제하는 요청을 보낸다. (axios 또는 fetch 등을 사용)
    axios
      .post('/api/contents/deleteSelected', {
        selectedIds,
      })
      .then((response) => {
        if (response.status === 200) {
          // 1초마다 선택된 항목을 순환하며 사라지는 효과 적용
          selectedIds.forEach((_id) => {
            // console.log('ㅎㅇ~~~~~~~~~~~~~~~~~~', _id);

            const selectedEl = document.getElementById(`carList-${_id}`);
            if (selectedEl) {
              selectedEl.style.transition = 'opacity 1s'; // 투명도에 1초 동안의 트랜지션 적용
              selectedEl.style.opacity = '0'; // 투명하게 만듭니다.

              // 1초 후에 display를 변경
              setTimeout(() => {
                selectedEl.style.display = 'none';
                // 선택된 항목들을 삭제한 뒤, 화면에서도 삭제한다.
                const updatedCartList = cartList.filter(
                  (item) => !selectedIds.includes(item._id)
                );
                setCartList(updatedCartList);
              }, 1000);
            }
          });

          setAllChecked(false); // 전체 선택 체크박스 초기화
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
        <button onClick={handleDeleteSelected}>
          {allChecked ? '전체삭제' : '선택삭제'}
        </button>
        {cartList.map((el, i) => (
          <div key={`${el._id}`} className='flex' id={`carList-${el._id}`}>
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
              <div>수량: {el.quantity}</div>
              <div className='flex items-center'>
                <button
                  className='flex items-center justify-center w-[3rem] h-[3rem] overflow-visible p-4 border border-gray-200 rounded-l-md text-base font-normal text-gray-900 bg-gray-300'
                  onClick={() => handleQuantityChange(el, -1)}
                >
                  -
                </button>
                <QuantityInput initialValue={el.quantity}></QuantityInput>
                <button
                  className='flex items-center justify-center w-[3rem] h-[3rem] overflow-visible p-4 border border-gray-200 rounded-r-md text-base font-normal text-gray-900 bg-gray-300'
                  onClick={() => handleQuantityChange(el, 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button onClick={() => handleDelete(el)}>삭제</button>
          </div>
        ))}
      </div>
      <div className='flex'>
        <div>총 결제 금액: {totalPrice}</div>
        <Link href='/order/cart' className=' bg-slate-600'>
          결제하기
        </Link>
      </div>
    </div>
  );
}
