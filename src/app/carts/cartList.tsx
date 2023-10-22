'use client';

import axios from 'axios';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import Link from 'next/link';
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

  const handleDelete = (el: any, i: number) => {
    axios
      .delete(`/api/contents/delete`, { data: el._id.toString() })
      .then((r) => {
        if (r.status === 200) {
          const updatedCartList = cartList.filter(
            (item) => item._id !== el._id
          );
          setCartList(updatedCartList);

          const target = document.getElementById('cartList-' + i);
          if (target) {
            // 투명도에 1초 동안의 트랜지션 적용
            target.classList.add('transition-opacity');
            // 투명하게 만듭니다.
            target.classList.add('opacity-0');

            // opacity가 0이 되는 1초 후에 display를 변경
            setTimeout(() => {
              // display를 none으로 변경
              target.classList.add('hidden');
            }, 1000);
          }
          // TODO: 위 코드와 동일함 블로그에 정리하기
          // 투명도에 1초 동안의 트랜지션 적용 후 투명하게 만든 뒤 opacity(투명도)가 0이 되는 1초 후에 display를 none으로 변경해서 사라지게 함
          // 1초동안 천천히 사라지는 효과
          // if (target) {
          //   target.style.transition = 'opacity 1s'; // 투명도에 1초 동안의 트랜지션 적용
          //   target.style.opacity = '0'; // 투명하게 만듭니다.
          //   // opacity가 0이 되는 1초 후에 display를 변경
          //   setTimeout(() => {
          //     target.style.display = 'none';
          //   }, 1000);
          // }
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
          <div key={i} className='flex' id={`cartList-` + i}>
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
            <button onClick={() => handleDelete(el, i)}>X</button>
          </div>
        ))}
      </div>
      <div className='flex'>
        <div>총 결제 금액: {totalPrice}</div>
        <Link href='/order' className=' bg-slate-600'>
          결제하기
        </Link>
      </div>
    </div>
  );
}
