'use client';

// import { paymentApi } from '@/app/redux/apis/paymentApi';
import { paymentApi } from '../../redux/apis/paymentApi';
// import { RootState } from '@/app/redux/store';
import { RootState } from '../../redux/store';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function OderItems() {
  const itemId = useSelector((state: RootState) => state.order.itemId);
  const _id = useSelector((state: RootState) => state.order._id);
  const totalPrice = useSelector((state: RootState) => state.order.totalPrice);

  const payItem = paymentApi.useGetOrderQuery({ _id, itemId, totalPrice });

  return (
    <div>
      {payItem.isSuccess ? (
        <div className='w-[90%] shadow-md bg-white rounded-md p-5 mb-[5rem] opacity-100 transition-all duration-1000'>
          <table className='w-full border-collapse border border-gray-300'>
            {/* FIXME: thead 추가해서 표 수정하기 */}
            {/* <thead></thead> */}
            <tbody>
              <tr>
                <th className='border p-4 w-1/5' rowSpan={2}>
                  <div className='flex items-center justify-center'>
                    <Image
                      src={payItem.data.img_src}
                      width={100}
                      height={100}
                      alt='상품 이미지'
                    />
                  </div>
                </th>
                <th className='p-4 text-center w-2/5 border-b'>상품명</th>
                <th className='p-4 text-center w-1/5 border-b'>수량</th>
                <th className='p-4 text-center w-1/5 border-b'>가격</th>
              </tr>

              <tr>
                {/* 상품명 */}
                <td className='p-4 text-center'>{payItem.data.title}</td>
                {/* 수량 */}
                <td className='p-4 text-center'>
                  {payItem.data.totalQuantity}
                </td>
                {/* 가격 */}
                <td className='p-4 text-center'>
                  {payItem.data.totalPrice.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
