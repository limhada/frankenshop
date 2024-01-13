'use client';

import { ObjectId } from 'mongodb';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import QuantityInput from '../components/QuantityInput';
import { cartsApi } from '../redux/apis/cartsApi';
import Link from 'next/link';
import OderButton from './orderButton';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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

// TODO: 장바구니 총 결제 금액은 네비게이션바 처럼 항상 스롤상관없이 항상 보이게
export interface CartsProps {
  cartsData: {
    _id: ObjectId;
    title: string;
    description: string;
    img_src: string;
    author: string;
    price: number;
    like: boolean;
    quantity: number;
    checked: boolean;
  }[];
}

export interface CartItem {
  _id: string;
  title: string;
  img_src: string;
  author: string;
  price: number;
  description: string;
  quantity: number;
  checked: boolean;
}

export default function CartList() {
  const name = 'cartsContents';
  const query = cartsApi.useGetCartsQuery(name);

  // console.log('query@@@@@`', query.data);

  const router = useRouter();

  const [cartList, setCartList] = useState<CartsProps['cartsData']>(
    query.data || []
  );

  const [allChecked, setAllChecked] = useState(false); // 전체 선택 체크박스 상태
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // query.data가 로딩되면 cartList를 업데이트
    if (query.data) {
      setCartList(query.data);

      // cartList가 변경되면 전체 선택 체크박스의 상태 업데이트
      const updateChecked =
        query.data.length > 0
          ? query.data.every((item: CartItem) => item.checked)
          : false;
      setAllChecked(updateChecked);
      // console.log('updateChecked~~~~~~~~~~~~``', updateChecked);
    }
  }, [query.data]);

  useEffect(() => {
    // 총 결제 금액을 업데이트하는 함수
    const updateTotalPrice = () => {
      const totalPrice = cartList
        .filter((item) => item.checked)
        .reduce((total, item) => {
          // total + parseFloat(item.price.replace(',', '')) * item.quantity,
          const price = item.price;
          const subtotal = price * item.quantity;
          // console.log(`Item: ${item.title}, Price: ${price}, Quantity: ${item.quantity}, Subtotal: ${subtotal}`);
          return total + subtotal;
        }, 0);
      setTotalPrice(totalPrice);
    };

    // 초기 총 결제 금액 설정
    updateTotalPrice();
  }, [cartList]);

  const [toggleAllCheckbox] = cartsApi.useToggleAllCheckboxMutation();
  const handleAllCheckboxChange = () => {
    toggleAllCheckbox({});
  };

  const [changeCheckbox] = cartsApi.useToggleCheckboxMutation();
  const handleCheckboxChange = (el: any) => {
    // console.log(el._id, 'el ㅎㅇ~~~~~~~~~~~');
    changeCheckbox({ _id: el._id });
  };

  const [deleteCartItem] = cartsApi.useDeleteCartItemMutation();
  const handelDeleteCartItem = (_id: ObjectId) => {
    // 1초 후에 투명도를 조절하고 display를 변경합니다.
    const target = document.getElementById(`carList-${_id}`);
    if (target) {
      target.style.opacity = '0';
      target.style.transition = 'opacity 0.4s';

      setTimeout(() => {
        target.style.display = 'none';
        deleteCartItem({ _id });
      }, 400);
    }
  };

  const [deleteSelectedCartItem] = cartsApi.useDeleteSelectedCartItemMutation();

  const handleDeleteSelected = () => {
    // 체크된 항목만 필터링
    const selectedItems = cartList.filter((item) => item.checked);
    if (selectedItems.length === 0) {
      // 체크된 항목이 없으면 아무 작업도 수행하지 않음
      // console.log('없음~~~~~~~~~~');
      return;
    }

    // 선택된 항목들의 _id 값을 배열로 추출
    const selectedIds = selectedItems.map((item) => item._id);

    selectedIds.forEach((_id) => {
      // console.log('ㅎㅇ~~~~~~~~~~~~~~~~~~', _id);

      const selectedEl = document.getElementById(`carList-${_id}`);
      if (selectedEl) {
        selectedEl.style.transition = 'opacity 1s'; // 투명도에 1초 동안의 트랜지션 적용
        selectedEl.style.opacity = '0'; // 투명하게 만듭니다.

        // 1초 후에 display를 변경
        setTimeout(() => {
          selectedEl.style.display = 'none';
          deleteSelectedCartItem(selectedIds);
        }, 400);
      }
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
        {/* {query.data && query.data.map((el: any, i: number) => ( */}
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
              <p>가격 {el.price.toLocaleString()}</p>
            </div>
            <div className='flex'>
              {/* FIXME: 해결 - 수량 증가 및 감소 버튼 onClick시 로직 함수화 하기 현재 +와 -에서 두번 중복 사용중임 */}

              <div className='flex items-center'>
                <QuantityInput
                  initialValue={el.quantity}
                  _id={el._id as ObjectId}
                ></QuantityInput>
              </div>
            </div>
            <button onClick={() => handelDeleteCartItem(el._id)}>삭제</button>
          </div>
        ))}
      </div>
      <div className='flex items-center justify-center m-3'>
        <div className='font-bold text-[2rem] text-myColor1 mr-[3rem]'>
          주문금액 {totalPrice.toLocaleString()}원
        </div>
        {/* <Link href='/order/carts' className=' bg-slate-600'>
          결제하기
        </Link> */}
        <button
          className='text-white h-[3rem] cursor-pointer overflow-visible p-1 border-1 border-gray-300 rounded-md bg-myColor1'
          onClick={() => {
            axios
              .get('/api/order/cartPayment')
              .then((r) => {
                console.log('결과~~~~~~~~~', r);

                // TODO:  AES 알고리즘을 사용하여 ObjectId를 암호화하기!!!!!
                // console.log(r.status);
                // console.log(r.data);
                if (r.status === 200) {
                  router.push(`/order/carts?_id=${r.data}`);
                }
              })
              .catch((error) => {
                console.error('에러 발생:', error);
              });
          }}
        >
          기존 구매하기버튼
        </button>
      </div>
    </div>
  );
}
