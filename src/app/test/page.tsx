'use client';
import { useState } from 'react';
import Address from '../components/Address';

const Test = () => {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    setInputValue1(value);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    setInputValue2(value);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    setInputValue3(value);
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
          <div>
            <input
              type='tel'
              maxLength={3}
              value={inputValue1}
              onChange={handleChange1}
              placeholder='010'
              className='w-[5rem] overflow-visible p-4 border mt-[0.4rem] border-gray-200 rounded-md bg-white text-base font-normal text-gray-900'
              pattern='[0-9]'
            />
            <span className='m-[0.5rem]'>-</span>
            <input
              type='tel'
              maxLength={4}
              value={inputValue2}
              onChange={handleChange2}
              placeholder='0000'
              className='w-[5rem] overflow-visible p-4 border mt-[0.4rem] border-gray-200 rounded-md bg-white text-base font-normal text-gray-900'
              pattern='[0-9]'
            />
            <span className='m-[0.5rem]'>-</span>
            <input
              type='tel'
              maxLength={4}
              value={inputValue3}
              onChange={handleChange3}
              placeholder='0000'
              className='w-[5rem] overflow-visible p-4 border mt-[0.4rem] border-gray-200 rounded-md bg-white text-base font-normal text-gray-900'
              pattern='[0-9]'
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Test;
