'use client';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

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

const HANGUL_START_CHARCODE = '가'.charCodeAt(0);
const CHO_PERIOD = Math.floor('까'.charCodeAt(0) - '가'.charCodeAt(0));
const JUNG_PERIOD = Math.floor('개'.charCodeAt(0) - '가'.charCodeAt(0));

const combine = (cho: number, jung: number, jong: number) => {
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

interface SearchInputProps {
  nameList: string[];
}

// FIXME: 치명 - 있는 상품 검색 후 바로 드래그해서 없는 상품 검색 시 이전 검색 값을 검색함 ex) ㅇㅍ 검색 후 ㅂㅂ 검색 시 ㅇㅍ에 해당하는 용품을 계속 검색함 ㅂㅂ는 검색되지 않음

const SearchInput = ({ nameList }: SearchInputProps) => {
  const router = useRouter();
  const [search, setSearch] = useState(''); // 현재 검색어
  const [result, setResult] = useState<React.ReactNode[]>([]); // 검색 결과
  const [searchValue, setSearchValue] = useState(''); //  현재 입력 중인 검색어

  const handleClick = (value: any) => {
    // console.log('크ㄹ릭~~~~~~~~~~~~~~~~');
    setSearch(value); // 클릭 한 값을 현재 인풋에 업데이트 하기
    setResult([]); //추천 검색어 창 닫기
    setSearchValue(value); // 현재 입력중인 값 업데이트
  };

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
      setSearchValue(''); // 입력값이 없을 때 검색 값 ''로 초기화
      return;
    }

    const regex = makeRegexByCho(trimmedInputValue);

    // console.log('regex~~~~~~~~~~~`', regex);

    // 테스트 데이터용
    // const filteredList = list.filter((item) => item.match(regex));

    // 인풋에 ㅅㅍ 입력시 ㅅㅍ이 들어간 모든 이름이 담겨있는 리스트
    const filteredList = nameList.filter((item) => item.match(regex));
    // console.log('filteredList~~~~~~~~~~~`', filteredList);

    const resultList = filteredList.map((item, index) => {
      const matches = item.match(regex);
      if (matches) {
        // console.log('matches~~~~~~~~~~~~~', matches);
        // console.log('~~~~~~~~~~result', result);

        // 검색어가 존재하고, 현재 인덱스가 0일 때만 setSearchValue 실행
        // ex) 초성만 입력 후 검색 시 예를들어 ㅎㅇ입력 시 첫 번째로 일치하는 활용을 검색하기 위함
        if (index === 0) {
          setSearchValue(matches[0]);
          // console.log(matches[0], 'matches[0]');
        }

        const parts = item.split(regex);
        return (
          <div
            key={index}
            className='mr-2 text-black hover:bg-[#f3f3f3]'
            onClick={() => handleClick(item)}
          >
            {parts.map((part, partIndex) => (
              <React.Fragment key={partIndex}>
                {partIndex === 1 ? (
                  // 여러 검색어에 대한 강조 처리
                  // <mark key={partIndex}>{matches[partIndex]}</mark>
                  <span className='bg-red-300' key={partIndex}>
                    {matches[partIndex]}
                  </span>
                ) : (
                  <span key={partIndex}>{part}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        );
      } else {
        return <span key={index}>{item}</span>;
      }
    });
    setSearch(inputValue);
    setResult(inputValue ? resultList : []);
  };

  const handleBlur = () => {
    // 포커스가 사라질 때 검색 결과를 초기화하고 숨김
    // setResult([]);

    // FIXME: setTimeout 추가한 이유: 포커스가 사라질때 result를 []로 초기화 하니까 추천검색어를 선택해도 인풋창에 선택한 추천검색어가 들어가지 않는 이슈 발생
    // 포커스가 해제될때 선택한 값이 input에 들어가기 전에 result가 []로 먼저 초기화 되는 문제가 발생한것 같음
    setTimeout(() => {
      setResult([]);
    }, 100);
  };

  // console.log(result, 'result ㅎㅇ~~~~~~~~~~~~~~~~~~~~');

  // FIXME: 기존코드 (인풋에 값 입력 시 css 틀어짐 문제 발생)
  /*
    return (
    <div className='flex mr-5 items-center'>
      <div className='mr-3 no-underline w-[30rem]'>
        <input
          type='text'
          value={search}
          onChange={_events}
          className='text-black w-[100%] border rounded-lg focus:ring-2 focus:ring-blue-500
          '
        />
        {search && result.length > 0 && (
          <div className='h-[10rem] overflow-y-auto bg-white'>{result}</div>
        )}
      </div>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        // className='cursor-pointer pt-1'
        className='cursor-pointer'
      />
    </div>
  );
};
  */

  // useEffect(() => {
  //   // result가 변경될 때마다 실행되는 부분
  //   console.log('검색 결과가 렌더링되었습니다:', result);
  // }, [result]); // result가 변경될 때만 useEffect 실행

  // useEffect(() => {
  //   // searchValue가 변경될 때마다 실행되는 부분
  //   // console.log('searchValue:', searchValue);
  // }, [searchValue]);

  return (
    <div className='relative flex mr-5 items-center bg-white border rounded-lg'>
      {/* 검색창 가로 크기 */}
      <div className='relative no-underline w-[20rem]'>
        <input
          type='text'
          value={search}
          onChange={_events}
          onBlur={handleBlur}
          className='text-black w-full rounded-lg focus:ring-2 focus:ring-blue-500'
        />
        {search && result.length > 0 && (
          <div className='absolute left-0 right-0 top-full h-[10rem] bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 mt-1 overflow-y-auto'>
            <div
              className='py-1'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'
            >
              {/* 1번방법 1번 2번 같은 기능*/}
              {/* {result.map((el, i) => (
                <a
                  key={i}
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  role='menuitem'
                >
                  {el}
                </a>
              ))} */}

              {/* 2번방법 */}
              {result}
            </div>
          </div>
        )}
      </div>
      {/* 검색 돋보기 아이콘 */}
      {/* FIXME: 추천검색어 중 첫 번째 값이 검색 됨 ㅅㅎ 입력 시 [생활용품, 십한일폭] 일 경우 생활용품 만 검색 됨 생활용품 십한일폭 등 일치하는 모든 추천 검색어를 검색할지 고민해보기 */}
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className='text-2xl rounded-lg cursor-pointer text-myColor1 font-bold bg-white'
        onClick={() => {
          // console.log('검색클릭', searchValue);
          if (search && result && searchValue !== '') {
            // 입력 중 일때
            // console.log('입력 중 =', searchValue);
            // console.log('입력 중 =', search);
            // console.log(searchValue, '~~~~~~searchValue');
            router.push('/search/' + searchValue);
          } else if (search && searchValue === '') {
            alert('일치하는 상품이 없습니다.');
          } else {
            // 입력 중 아닐 때
            // console.log('입력 중 아닐때 = ',search);
            alert('검색어가 입력되지 않았습니다.');
          }
        }}
      />
    </div>
  );
};
export default SearchInput;
