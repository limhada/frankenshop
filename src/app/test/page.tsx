'use client';
import { useEffect, useState } from 'react';
import Address from '../components/Address';

const Test = () => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (inputValue.length === 10) {
      setInputValue(inputValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (inputValue.length === 13) {
      setInputValue(
        inputValue
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      );
    }
  }, [inputValue]);

  const handleChange = (e: any) => {
    // 사용자의 입력을 상태에 업데이트
    setInputValue(e.target.value);
  };

  return (
    <div>
      <ul>
        <li className='mb-[1.25rem]'>
          <div className='inline-block font-bold'>배송지명</div>
          <input
            type='text'
            id='detailAddress'
            placeholder='예) 집'
            className='w-full overflow-visible p-4 border mt-[0.4rem] border-gray-200 rounded-md bg-white text-base font-normal text-gray-900'
          />
        </li>
        <li className='mb-[1.25rem]'>
          <Address></Address>
        </li>
        <li className='mb-[1.25rem]'>
          <div className='inline-block font-bold mt-[0.4rem]'>연락처</div>
          <br />
          <input
            type='tel'
            maxLength={13} // 최대 길이 지정
            value={inputValue}
            onChange={handleChange}
            placeholder='전화번호를 입력하세요'
            className='w-50% overflow-visible p-4 border mt-[0.4rem] border-gray-200 rounded-md bg-white text-base font-normal text-gray-900'
          />
        </li>
      </ul>
    </div>
  );
};

export default Test;
