'use client';

import React, { useState, ChangeEvent } from 'react';

const list = [
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
  'apple',
  'banana',
  'cherry',
  'dog',
  'elephant',
  'fish',
  'grape',
  'hamburger',
  'ice cream',
  'jungle',
  'kiwi',
  'lemon',
  'mouse',
  'notebook',
  'orange',
  'pizza',
  'quokka',
  'rabbit',
  'sunflower',
  'tiger',
  'umbrella',
  'vanilla',
  'watermelon',
  'xylophone',
  'yellow',
  'zebra',
];

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

const HANGUL_START_CHARCODE = '가'.charCodeAt(0);
const CHO_PERIOD = Math.floor('까'.charCodeAt(0) - '가'.charCodeAt(0));
const JUNG_PERIOD = Math.floor('개'.charCodeAt(0) - '가'.charCodeAt(0));

function combine(cho: number, jung: number, jong: number): string {
  return String.fromCharCode(
    HANGUL_START_CHARCODE + cho * CHO_PERIOD + jung * JUNG_PERIOD + jong
  );
}

function makeRegexByCho(search = '') {
  const regex = CHO_HANGUL.reduce(
    (acc, cho, index) =>
      acc.replace(
        new RegExp(cho, 'g'),
        `[${combine(index, 0, 0)}-${combine(index + 1, 0, -1)}]`
      ),
    search
  );

  return new RegExp(`(${regex})`, 'g');
}

const Search2 = () => {
  const [searchResult, setSearchResult] = useState<JSX.Element[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.trim();
    const regex = makeRegexByCho(search);

    const handleItemClick = (selectedItem: string) => {
      setInputValue(selectedItem);
    };

    const resultItems = list
      .filter((item) => regex.test(item))
      .map((item, index) => (
        <span
          key={index}
          className='search-result-item mr-3'
          // text-myColor1
          data-item={item}
          onClick={() => handleItemClick(item)}
        >
          {item.split(regex).map((part, index) =>
            // index % 2 === 0 ? part : <mark key={index}>{part}</mark>
            index % 2 === 0 ? (
              part
            ) : (
              <span className='bg-myColor2 rounded-md' key={index}>
                {part}
              </span>
            )
          )}
        </span>
      ));

    setSearchResult(search ? resultItems : []);
    setInputValue(search); // 입력값을 업데이트
  };

  return (
    <div>
      <form>
        <h2>초성검색</h2>
        <p>(검색어 - 사과, 수박, 멜론, 파인애플, 산딸기, 딸기, 망고)</p>
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          placeholder='텍스트를 입력해주세요.'
        />
        <div>
          <p className='docs'>
            결과:{' '}
            {searchResult.map((element, index) => (
              <React.Fragment key={index}>
                {element}
                {/* {index !== searchResult.length - 1 && ', '} */}
              </React.Fragment>
            ))}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Search2;
