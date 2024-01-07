'use client';

import { paymentApi } from "@/app/redux/apis/paymentApi";
import { RootState } from "@/app/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function OderItems() {

  const itemId = useSelector((state: RootState) => state.order.itemId);
  const [oderList, setOderList] = useState('')
  
  // useEffect(() => {
  //   // 여기서 itemId를 사용하여 원하는 작업을 수행합니다.
  //   console.log(itemId);
  // }, [itemId]); 

  const name = 'payment'
  const payItem = paymentApi.useGetOderQuery({name})

  if (payItem) {
    console.log('payItem.data=', payItem.data);
  }


  return (
    <div>
      {/* {oderList.map((el, i) => (
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


              <div className='flex items-center'>
                <QuantityInput
                  initialValue={el.quantity}
                  _id={el._id as ObjectId}
                ></QuantityInput>
              </div>
            </div>
            <button onClick={() => handelDeleteCartItem(el._id)}>삭제</button>
          </div>
        ))} */}

    </div>
  );
}
