'use client';

import React, { useState } from 'react';

const CHO_HANGUL = [
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

const list = [
  '사과',
  '파인애플',
  '딸기',
  '상품1',
  '상품2',
  '코코아',
  'abbbc'
  ,
  // '샤인머스켓',
  // '초코송이',
  '고구마',
];

const HANGUL_START_CHARCODE = '가'.charCodeAt(0);
const CHO_PERIOD = Math.floor('까'.charCodeAt(0) - '가'.charCodeAt(0));
const JUNG_PERIOD = Math.floor('개'.charCodeAt(0) - '가'.charCodeAt(0));

const combine = (cho: any, jung: any, jong: any) => {
  return String.fromCharCode(
    HANGUL_START_CHARCODE + cho * CHO_PERIOD + jung * JUNG_PERIOD + jong
  );
};

const makeRegexByCho = (search = '') => {
  const regex = CHO_HANGUL.reduce(
    (acc, cho, index) =>
      acc.replace(
        new RegExp(cho, 'g'),
        `[${combine(index, 0, 0)}-${combine(index + 1, 0, -1)}]`
      ),
    search
  );

  return new RegExp(`(${regex})`);
};

const ChoSearch = () => {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<React.ReactNode[]>([]);

  const _events = (event: any) => {
    const inputValue = event.target.value.trim();
    const regex = makeRegexByCho(inputValue);

    console.log('regex~~~~~~~~~~~`', regex);

    const filteredList = list.filter((item) => item.match(regex));

    console.log('filteredList~~~~~~~~~~~`', filteredList);

    const resultList = filteredList.map((item, index) => {
      const matches = item.match(regex);
      if (matches) {
        const parts = item.split(regex);
        console.log('~~~~~~~~~~~matches', matches);
        console.log('~~~~~~~~~~~parts', parts);
        return (
          <span key={index} className='mr-2'>
            {parts.map((part, partIndex) => (
              <React.Fragment key={partIndex}>
                {partIndex === 1 ? (
                  // 여러 검색어에 대한 강조 처리
                  <mark key={partIndex}>{matches[partIndex]}</mark>
                ) : (
                  <span key={partIndex}>{part}</span>
                )}
              </React.Fragment>
            ))}
          </span>
        );
      } else {
        return <span key={index}>{item}</span>;
      }
    });

    setSearch(inputValue);
    setResult(inputValue ? resultList : []);
  };

  return (
    <div>
      입력:
      <input type='text' value={search} onChange={_events} />
      <div className='docs'>결과: {result}</div>
    </div>
  );
};

export default ChoSearch;
