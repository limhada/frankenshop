'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import { faBars } from '@fortawesome/free-solid-svg-icons'; // 'faBars' 아이콘을 가져옵니다
import { useState } from 'react';

export default function Category() {
  const [isOpen, setIsOpen] = useState(false);
  const Dropdown = () => {
    setIsOpen(!isOpen);
  };

  let categoryData = ['인기상품', '할인상품', '그림', '생활용품'];

  return (
    <div>
      <div
        onMouseEnter={Dropdown}
        onMouseLeave={Dropdown}
        className='w-[50px] h-[100px]'
        // FIXME: 햄버거 메뉴에서 마우스 오른쪽으로 이동시 공백이여도 드롭다운 메뉴창 안닫힘 * 햄버거메뉴 크기만큼 w와h 설정하기
      >
        <FontAwesomeIcon icon={faBars} className='cursor-pointer' />

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
                      {el}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
