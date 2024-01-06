'use client';

import { useState } from "react";

export default function OderItems() {

  const [oderList, setOderList] = useState([])

  return (
    <div>
      {oderList.map((el, i) => (
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
  );
}
