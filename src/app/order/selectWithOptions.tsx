'use client';
import { useState } from 'react';

// TODO: select사용법 블로그에 정리하기

// type User = {
//   name: string;
//   email: string;
//   role: string;
// };

// type Data = {
//   session: {
//     user: User;
//   };
// };

// export default function SelectWithOptions({ session }: Data) {
export default function SelectWithOptions() {
  const options = [
    { value: 'oMessage-0', label: '-- 메시지 선택 (선택사항) --' },
    { value: 'oMessage-1', label: '배송 전에 미리 연락바랍니다.' },
    { value: 'oMessage-2', label: '부재 시 경비실에 맡겨주세요.' },
    { value: 'oMessage-3', label: '부재 시 문 앞에 놓아주세요.' },
    { value: 'oMessage-4', label: '빠른 배송 부탁드립니다.' },
    { value: 'oMessage-5', label: '택배함에 보관해 주세요.' },
    { value: 'oMessage-input', label: '직접 입력' },
  ];

  const [selectedOption, setSelectedOption] = useState('oMessage-0');
  const [customMessage, setCustomMessage] = useState(''); // 새로운 상태 추가

  // FIXME: any로 타입 지정한 부분 수정하기
  const handleChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  // FIXME: any로 타입 지정한 부분 수정하기
  const handleCustomMessageChange = (e: any) => {
    setCustomMessage(e.target.value);
  };

  // console.log(session, 'ㅎㅇ~~~~~~~~~~~~~~~~~~');
  return (
    <div>
      <select
        id='omessage_select'
        name='omessage_select'
        onChange={handleChange}
        data-gtm-form-interact-field-id='0'
        fw-filter=''
        fw-label='배송 메세지'
        fw-msg='배송 메시지를 선택해주세요.'
      >
        {options.map((option, i) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedOption === 'oMessage-input' && (
        <input
          type='text'
          placeholder='직접 입력'
          value={customMessage} // 값을 customMessage로 설정
          onChange={handleCustomMessageChange} // 입력 내용을 customMessage로 업데이트
        />
      )}
      <p>선택된 옵션: {selectedOption}</p>
      {selectedOption === 'oMessage-input' && (
        <p>직접 입력한 내용: {customMessage}</p>
      )}
    </div>
  );
}
