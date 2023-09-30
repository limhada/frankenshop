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

  return (
    <div>
      {/* TODO: 마우스 오버 or 클릭 시 카테고리 보이게 */}
      <div onMouseEnter={Dropdown} onMouseLeave={Dropdown}>
        <FontAwesomeIcon icon={faBars} className='cursor-pointer' />

        {/* FIXME: 햄버거 메뉴에서 마우스 오른쪽으로 이동시 공백이여도 드롭다운 메뉴창 안닫힘 */}
        <div className='relative'>
          {isOpen && (
            <div className='origin-top-left absolute left-0 top-0 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
              <div
                className='py-1'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
              >
                <a
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  role='menuitem'
                >
                  Option 1
                </a>
                <a
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  role='menuitem'
                >
                  Option 2
                </a>
                <a
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  role='menuitem'
                >
                  Option 3
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
