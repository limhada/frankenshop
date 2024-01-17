'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faBars } from '@fortawesome/free-solid-svg-icons'; // 'faBars' 아이콘을 가져옵니다
import { useState } from 'react';

export default function Category() {
  const [isOpen, setIsOpen] = useState(false);
  const Dropdown = () => {
    setIsOpen(!isOpen);
  };

  // TODO: ex) 인기상품 클릭 시 메인 페이지에서 인기상품만 필터링 되서 보여지고 상단에 인기상품 or 할인상품 같은 제목만 추가하기 로직 구현하기

  let categoryData = [
    { name: '인기상품' },
    { name: '할인상품' },
    { name: '그림' },
    { name: '생활용품' },
    { name: '신상품' },
    { name: '상의' },
    { name: '하의' },
    { name: '신발' },
  ];

  return (

      <div
        onMouseEnter={Dropdown}
        onMouseLeave={Dropdown}
        className='mr-5'
        // FIXME: w와 h로 햄버거메뉴 마우스 out 영역 크기 설정
      >
        <FontAwesomeIcon
          icon={faBars}
          className='cursor-pointer text-4xl'
          // size='2x'
        />

        <div className='relative'>
          {isOpen && (
            <div className='origin-top-left absolute left-0 top-0 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
              <div
                className='py-1'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
              >
                {categoryData.map((el, i) => {
                  return (
                    <a
                      key={i}
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      role='menuitem'
                    >
                      {el.name}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

  );
}
