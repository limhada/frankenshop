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
  '딸기와 사과와 딸기',
  '상품1',
  '상품2',
  '코코아',
  'abbbc',
  // '샤인머스켓',
  // '초코송이',
  '고구마',
  '1.2',
  '1..2',
  '1.2.3',
  'abbbbc',
  'bbbbbaac',
];

const HANGUL_START_CHARCODE = '가'.charCodeAt(0);
const CHO_PERIOD = Math.floor('까'.charCodeAt(0) - '가'.charCodeAt(0));
const JUNG_PERIOD = Math.floor('개'.charCodeAt(0) - '가'.charCodeAt(0));

const combine = (cho: any, jung: any, jong: any) => {
  return String.fromCharCode(
    HANGUL_START_CHARCODE + cho * CHO_PERIOD + jung * JUNG_PERIOD + jong
  );
};

// 이스케이핑 함수
const escapeRegExp = (text: string) => {
  // 정규표현식에서 특수 문자를 이스케이핑하여 문자열이 정확하게 검색되도록 함
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

const makeRegexByCho = (search = '') => {
  // 입력값을 이스케이핑하여 특수문자가 정확히 검색되도록 함
  const escapedSearch = escapeRegExp(search);
  const regex = CHO_HANGUL.reduce(
    (acc, cho, index) =>
      // 정규표현식 내에서 특정 자음을 범위로 나타내도록 함
      acc.replace(
        new RegExp(cho, 'g'),
        `[${combine(index, 0, 0)}-${combine(index + 1, 0, -1)}]`
      ),
    escapedSearch
  );

  return new RegExp(`(${regex})`);
};

const ChoSearch = () => {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<React.ReactNode[]>([]);

  const _events = (event: any) => {
    const inputValue = event.target.value; // 여기서 trim()사용 시 공백 입력 못함

    const trimmedInputValue = inputValue.trim(); // 필요한 경우에만 trim() 호출

    // TODO: 예외처리 블로그에 정리하기

    // 처음 입력값이 공백인 경우 입력 안되도록 처리
    if (search === '' && trimmedInputValue === '') {
      return;
    }

    // 입력값이 '.' 하나거나 '.'로만 이루어진 경우 동작하지 않음
    // if (/^\.+$/.test(trimmedInputValue)) {
    //   setSearch(inputValue);
    //   setResult([]);
    //   return;
    // }

    // 입력값이 모두 삭제된 경우 동작하지 않음
    if (search !== '' && trimmedInputValue === '') {
      setSearch(inputValue);
      setResult([]);
      return;
    }

    const regex = makeRegexByCho(trimmedInputValue);

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
                  // <mark key={partIndex}>{matches[partIndex]}</mark>
                  <span className='bg-red-300' key={partIndex}>{matches[partIndex]}</span>
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
