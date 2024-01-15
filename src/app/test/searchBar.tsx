'use client';

import { useState } from 'react';

const data = [
  '사과',
  '수박',
  '멜론',
  '파인애플',
  '산딸기',
  '딸기',
  '망고',
  '가위',
  '고구마',
  '나비',
  '다람쥐',
  '더위',
  '도넛',
  '라면',
  '러브레터',
  '마우스',
  '바나나',
  '버섯',
  '보드게임',
  '사자',
  '새우',
  '수영장',
  '아이스크림',
  '안경',
  '양파',
  '자전거',
  '장미',
  '저격수',
  '차',
  '초코렛',
  '카메라',
  '타조',
  '토마토',
  '파인애플',
  '하트',
  '헬리콥터',
  '호떡',
  '기린',
  '나무',
  '다이아몬드',
  '레몬',
  '마법봉',
  '배구',
  '사과',
  '선글라스',
  '양말',
  '재규어',
  '참치',
  '컴퓨터',
  '키위',
  '텔레비전',
  '햄버거',
  '헬스',
  '호랑이',
  '화분',
];

// 한글을 초성으로 변환하는 함수
const getInitials = (text: string): string => {
  const INITIAL_JAUM = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];

  const charCode = text.charCodeAt(0);
  const initCode = (charCode - 44032) / 28 / 21;
  return INITIAL_JAUM[Math.floor(initCode)];
};

const SearchBar = ({ data }: { data: string[] }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const getSuggestions = () => {
    const suggestions = data.filter((item) => {
      const initialInput = getInitials(inputValue);
      const initialItem = getInitials(item);

      return initialItem.includes(initialInput);
    });
    return suggestions;
  };

  return (
    <div>
      <input
        className='bg-slate-500'
        type='text'
        value={inputValue}
        onChange={handleChange}
      />
      {/* 검색하기 전에는 아무것도 안 보이게 하기 위해 조건부 렌더링 적용 */}
      {inputValue.length > 0 && (
        <ul>
          {getSuggestions().map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
