'use client';

const list = [
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

// ReactApp.js

import { useState, ChangeEvent } from 'react';

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

/** includeByCho 함수는 초성 검색의 결과를 true 또는 false로 반환 */
// function includeByCho(search, targetWord) {
//   return makeRegexByCho(search).test(targetWord);
// }

const Search2 = () => {
  const [searchResult, setSearchResult] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.trim();
    const regex = makeRegexByCho(search);

    let htmlDummy = '';

    list.forEach((item) => {
      if (regex.test(item)) {
        htmlDummy += item.replace(regex, '<mark>$1</mark>') + ', ';
      }
    });

    setSearchResult(search ? htmlDummy : '');
  };

  return (
    <div>
      <form>
        <h2>초성검색</h2>
        <p>(검색어 - 사과, 수박, 멜론, 파인애플, 산딸기, 딸기, 망고)</p>
        <input
          type='text'
          onInput={handleInputChange}
          placeholder='텍스트를 입력해주세요.'
        />
        <div>
          <p className='docs'>
            결과:{' '}
            <span dangerouslySetInnerHTML={{ __html: searchResult }}></span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Search2;
