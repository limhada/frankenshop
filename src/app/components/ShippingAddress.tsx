'use client';
import { useState, ChangeEvent } from 'react';
import Address from '../components/Address';

const ShippingAddress = () => {
  const [inputValues, setInputValues] = useState(['', '', '']);

  const handleChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
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
        {/* wrap 사용 이유 : 연락처 부분에서는 flex-wrap을 사용하여 입력필드들이 화면의 너비에 따라 나란히 정렬되면서 일정한 간격을 유지하기 때문
         (wrap을 사용하지 않고 화면 너비가 줄어들 경우 인풋의 간격이 유지되질 않음) 
         */}
        <li className='mb-[1.25rem] flex flex-wrap items-center'>
          <div className='font-bold w-[6rem]'>연락처</div>
          {/* 갤럭시 폴드에서 연락처 배치 이상해져서 min-w 추가함 */}
          <div className='flex min-w-[20rem]'>
            {inputValues.map((value, index) => (
              <div key={index} className='items-center'>
                <input
                  type='tel'
                  maxLength={index === 0 ? 3 : 4}
                  value={value}
                  onChange={handleChange(index)}
                  placeholder={index === 0 ? '010' : '0000'}
                  className='w-[4rem] overflow-visible py-4 border border-gray-200 rounded-md bg-white text-base font-normal text-gray-900 text-center'
                  pattern='[0-9]'
                />
                {index < 2 && <div className='m-[0.5rem] inline-block'>-</div>}
              </div>
            ))}
          </div>
        </li>

        <li className='mb-[1.25rem]'>
          <div className='font-bold inline-block w-[6rem]'>배송지명</div>
          <input
            type='text'
            id='detailAddress'
            placeholder='예) 집'
            className='w-[15rem] overflow-visible p-4 border border-gray-200 rounded-md bg-white text-base font-normal text-gray-900'
          />
        </li>
        <li className='mb-[1.25rem]'>
          <Address />
        </li>
      </ul>
    </div>
  );
};

export default ShippingAddress;
