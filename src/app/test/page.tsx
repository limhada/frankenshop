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

  const [value, setValue] = useState('1');

  const max = 3;
  const handleChange22 = (event: any) => {
    const target = event.target;
    const value = target.value;

    if (value.length > max) {
      setValue(value.slice(0, max));
    } else {
      setValue(value);
    }
  };

  ///////////////////////////////////////////////

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;

    // 입력 값을 업데이트합니다.
    setInputValue1(value);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;

    // 입력 값을 업데이트합니다.
    setInputValue2(value);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;

    // 입력 값을 업데이트합니다.
    setInputValue3(value);
  };

  ////////////////////////////////////////////////////////////



  const [inputValue4, setInputValue4] = useState(["", "", ""]);

const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
  const target = event.target;
  const value = target.value;

  // 입력 값을 업데이트합니다.
  setInputValue4((prevValues) => {
    const index = event.target.name.slice(-1);
    return [...prevValues, value];
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
          <br />

          <br />
          <input
            type='number'
            value={value}
            onChange={handleChange22}
            min='0'
            max={max}
            className='border border-gray-200 rounded-md w-50% text-base font-semibold text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
          />

          <br />

          <div>
            <input
              type='tel'
              maxLength={3}
              value={inputValue1}
              onChange={handleChange1}
              placeholder='3자리 입력'
              className='w-50% overflow-visible p-4 border mt-[0.4rem] border-gray-200 rounded-md bg-white text-base font-normal text-gray-900'
              pattern='[0-9]'
            />
            <input
              type='tel'
              maxLength={4}
              value={inputValue2}
              onChange={handleChange2}
              placeholder='4자리 입력'
              className='w-50% overflow-visible p-4 border mt-[0.4rem] border-gray-200 rounded-md bg-white text-base font-normal text-gray-900'
              pattern='[0-9]'
            />
            <input
              type='tel'
              maxLength={4}
              value={inputValue3}
              onChange={handleChange3}
              placeholder='4자리 입력'
              className='w-50% overflow-visible p-4 border mt-[0.4rem] border-gray-200 rounded-md bg-white text-base font-normal text-gray-900'
              pattern='[0-9]'
            />
          </div>
          {/* //////////// */}
          <div>
    <input
      type="tel"
      maxLength={3}
      name="input1"
      value={inputValue4[0]}
      onChange={handleChange4}
      placeholder="3자리 입력"
      className="w-50% overflow-visible p-4 border mt-[0.4rem] border-gray-200 rounded-md bg-white text-base font-normal text-gray-900"
      pattern="[0-9]"
    />
    <input
      type="tel"
      maxLength={4}
      name="input2"
      value={inputValue4[1]}
      onChange={handleChange4}
      placeholder="4자리 입력"
      className="w-50% overflow-visible p-4 border mt-[0.4rem] border-gray-200 rounded-md bg-white text-base font-normal text-gray-900"
      pattern="[0-9]"
    />
    <input
      type="tel"
      maxLength={4}
      name="input3"
      value={inputValue4[2]}
      onChange={handleChange4}
      placeholder="4자리 입력"
      className="w-50% overflow-visible p-4 border mt-[0.4rem] border-gray-200 rounded-md bg-white text-base font-normal text-gray-900"
      pattern="[0-9]"
    />
  </div>
        </li>
      </ul>
    </div>
  );
};

export default Test;
