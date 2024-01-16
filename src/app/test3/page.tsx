'use client';

// import T1 from './t1';

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
  // '수박',
  // '멜론',
  // '파인애플',
  // '산딸기',
  // '딸기',
  // '망고',
  // '상품1',
  // '상품2',
  // '상품3',
  // '상품4',
  // '샤인머스켓',
  // '초코송이',
  // '고구마',
  // '스마트폰',
  // '가나나다',
  // 'abbc',
  // 'dfffd',
  // '사과과과과아',
  '코코아',
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

    console.log('~~~~~~~~~~~`', regex);

    const resultList = list.map((item, index) => {
      const matches = item.match(regex);
      if (matches) {
        const replacedItem = item.replace(
          regex,
          (match) => `<mark>${match}</mark>`
        );
        console.log('~~~~~~~~~~~replacedItem', replacedItem);
        return <React.Fragment key={index}>{replacedItem}</React.Fragment>;
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
      {/* <T1></T1> */}
    </div>
  );
};

export default ChoSearch;
