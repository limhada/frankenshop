'use client';
import { useEffect, useState } from 'react';
import { cartsApi } from '../redux/apis/cartsApi';
import { ObjectId } from 'mongodb';

interface QuantityInputProps {
  initialValue?: number;
  _id?: ObjectId;
}

// 1~1000까지 입력할 수 있는 인풋
const QuantityInput = ({ initialValue = 1, _id }: QuantityInputProps) => {
  const [value, setValue] = useState(initialValue);
  const max = 1000;

  // useEffect를 사용하여 initialValue이 변경될 때 value 상태를 업데이트
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

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

    setValue(parseInt(newValue, 10));
  };

  const handleIncrement = () => {
    if (value < max) {
      setValue(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const [updateQuantity] = cartsApi.useUpdateQuantityMutation();

  const handleQuantityUpdate = async (name: string) => {
    // 서버로 업데이트
    const result = await updateQuantity({ name, quantity: value, _id });
    // console.log(result, 'result ㅎㅇ~~~~~~~~~');
  };

  return (
    <div className='flex items-center'>
      <button
        className='flex items-center justify-center w-[3rem] h-[3rem] overflow-visible p-4 border border-gray-200 rounded-l-md text-base font-normal text-gray-900 bg-gray-300'
        onClick={() => handleQuantityUpdate('decrease')}
      >
        -
      </button>
      <input
        type='number'
        value={value}
        onChange={handleChange}
        min={1}
        max={max}
        onBlur={() => handleQuantityUpdate('updateInputQuantity')} // 포커스가 해제될 때 서버로 업데이트
        className='quantity-input w-[5rem] h-[3rem] text-center border border-gray-200 text-base font-semibold text-gray-900'
      />
      <button
        className='flex items-center justify-center w-[3rem] h-[3rem] overflow-visible p-4 border border-gray-200 rounded-r-md text-base font-normal text-gray-900 bg-gray-300'
        onClick={() => handleQuantityUpdate('increase')}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
