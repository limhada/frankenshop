'use client';

import Image from 'next/image';
import { OrderData } from './page';

interface OderItemsProps {
  result: OrderData;
}

export default function OderItems({ result }: OderItemsProps) {
  // console.log('ㅎㅇ~~~~~~', result);
  // console.log('ㅎㅇ~~~~~~', result.orders);
  // console.log('ㅎㅇ~~~~~~', result.orders[0]);
  // console.log('ㅎㅇ~~~~~~', result.orderPrice);

  return (
    <div>
      {result.orders.map((el: any, i: number) => (
        <div key={`OderItem_${el.cartItemId}`} className='flex'>
          <div className='w-[90%] shadow-md bg-white rounded-md p-5 mb-[0.3rem] opacity-100 transition-all duration-1000'>
            <table className='w-full border-collapse border border-gray-300'>
              <thead></thead>
              <tbody>
                <tr>
                  <th className='border p-4 w-1/5' rowSpan={2}>
                    <div className='flex items-center justify-center'>
                      <Image
                        src={el.img_src}
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
                  <td className='p-4 text-center'>{el.title}</td>
                  <td className='p-4 text-center'>{el.totalQuantity}</td>
                  <td className='p-4 text-center'>
                    {el.totalPrice.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
