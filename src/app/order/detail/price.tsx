'use client';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export default function Price() {
  // const itemId = useSelector((state: RootState) => state.order.itemId);
  // const _id = useSelector((state: RootState) => state.order._id);
  const totalPrice = useSelector((state: RootState) => state.order.totalPrice);

  return (
    <div>
      <div className='font-bold text-[2rem] mt-5 text-myColor1 mr-[3rem]'>
        주문금액 {totalPrice.toLocaleString()}원
      </div>
    </div>
  );
}
