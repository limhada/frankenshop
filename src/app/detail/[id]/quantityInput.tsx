'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  updateQuantity,
  decrement,
  increment,
  resetQuantity,
} from '../../redux/features/cartSlice';

// 1~1000까지 입력할 수 있는 인풋
const QuantityInput = () => {
  const quantity = useSelector((state: RootState) => state.cart.quantity);

  // console.log(quantity, 'quantity~~~~~~~~~~~~~~~~~~');
  const dispatch = useDispatch();

  // 컴포넌트가 처음 렌더링될 때 초기화
  useEffect(() => {
    dispatch(resetQuantity());
  }, []);

  const max = 1000;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    let newValue = target.value;

    // 숫자 이외의 문자 제거
    newValue = newValue.replace(/[^0-9]/g, '');

    // ''이면 다시 1로 초기화
    if (newValue === '') {
      newValue = '1';
    }

    // 최대값 제한 (max값 보다 큰 값이 들어오면 max값으로 자동 수정)
    if (parseInt(newValue, 10) > max) {
      newValue = String(max);
    }
    // 최소값 제한 (1 미만을 1로 변경)
    if (parseInt(newValue, 10) < 1) {
      newValue = '1';
    }
    // Redux 상태인 quantity를 업데이트(input에 직접 입력한 값으로 화면에 렌더링 됨)
    dispatch(updateQuantity(parseInt(newValue, 10)));
  };
  const handleIncrement = () => {
    if (quantity < max) {
      dispatch(increment());
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(decrement());
    }
  };

  return (
    <div className='flex items-center'>
      <button
        className='flex items-center justify-center w-[3rem] h-[3rem] overflow-visible p-4 border border-gray-200 rounded-l-md text-base font-normal text-gray-900 bg-gray-300'
        onClick={() => handleDecrement()}
      >
        -
      </button>
      <input
        type='number'
        value={quantity}
        onChange={handleChange}
        min={1}
        max={max}
        // onBlur={} // 포커스가 해제될 때
        className='quantity-input w-[5rem] h-[3rem] text-center border border-gray-200 text-base font-semibold text-gray-900'
      />
      <button
        className='flex items-center justify-center w-[3rem] h-[3rem] overflow-visible p-4 border border-gray-200 rounded-r-md text-base font-normal text-gray-900 bg-gray-300'
        onClick={() => handleIncrement()}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
