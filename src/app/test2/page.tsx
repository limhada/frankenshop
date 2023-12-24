// 1~5까지 입력할 수 있는 인풋

'use client';
import { useState } from 'react';

const Test = () => {
  const [value, setValue] = useState('1');
  const max = 5;

  const handleChange = (event: any) => {
    const target = event.target;

    let newValue = target.value;

    // 숫자 이외의 문자 제거
    newValue = newValue.replace(/[^0-9]/g, '');

    if (newValue === '') {
      newValue = '1';
    }

    // // 최대값 제한
    // if (parseInt(newValue, 10) > max) {
    //   newValue = String(max);
    // }
    // // 최소값 제한 (1 미만을 1로 변경)
    // if (parseInt(newValue, 10) < 1) {
    //   newValue = '1';
    // }

    setValue(newValue);
    
  };

  return (
    <div>
      <input
        type='number'
        value={value}
        onChange={handleChange}
        min='1'
        max={max}
        className='border border-gray-200 rounded-md w-[20%] text-base font-semibold text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
      />
    </div>
  );
};

export default Test;
