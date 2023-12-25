'use client'
import { useState, ChangeEvent } from 'react';
import Address from '../components/Address';

const ShippingAddress = () => {
  const [inputValues, setInputValues] = useState(['', '', '']);

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
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
          <Address />
        </li>
        <li className='mb-[1.25rem]'>
          <div className='inline-block font-bold mt-[0.4rem]'>연락처</div>
          <div className='flex'>
            {inputValues.map((value, index) => (
              <div key={index} className='items-center'>
                <input
                  type='tel'
                  maxLength={index === 0 ? 3 : 4}
                  value={value}
                  onChange={handleChange(index)}
                  placeholder={index === 0 ? '010' : '0000'}
                  className='w-[5rem] overflow-visible p-4 border mt-[0.4rem] border-gray-200 rounded-md bg-white text-base font-normal text-gray-900 text-center'
                  pattern='[0-9]'
                />
                {index < 2 && <span className='m-[0.5rem]'>-</span>}
              </div>
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ShippingAddress;

