'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

export default function Content() {
  // 이미지와 정보가 들어있는 배열 객체
  // TODO: 서버에서 받아오는 데이터로 변경하기
  // TODO: 해당 상품 클릭 시 상세페이지로 이동하게
  // TODO: 로그인 x 시 좋아요 클릭 시 로그인 하라고 알림창, 모든 하트 아이콘 기본 검은색으로
  const [contentData, setContentData] = useState([
    // FIXME: 서버에서 받아온 데이터 값 가져오기
    {
      imageUrl: '/imgtest/1.jpeg',
      title: 'Title 1',
      description: 'Description 1',
      price: '10,000',
      imgUrl: '',
      like: true,
    },
    {
      imageUrl: '/imgtest/2.jpeg',
      title: 'Title 2',
      description: 'Description 2',
      price: '20,000',
      imgUrl: '',
      like: false,
    },
    {
      imageUrl: '/imgtest/3.jpeg',
      title: 'Title 3',
      description: 'Description 3',
      price: '30,000',
      imgUrl: '',
      like: true,
    },
    {
      imageUrl: '/imgtest/4.jpeg',
      title: 'Title 4',
      description: 'Description 4',
      price: '40,000',
      imgUrl: '',
      like: false,
    },
    {
      imageUrl: '/imgtest/5.jpeg',
      title: 'Title 5',
      description: 'Description 5',
      price: '50,000',
      imgUrl: '',
      like: false,
    },
    {
      imageUrl: '/imgtest/1.jpeg',
      title: 'Title 6',
      description: 'Description 6',
      price: '10,000',
      imgUrl: '',
      like: false,
    },
    {
      imageUrl: '/imgtest/2.jpeg',
      title: 'Title 7',
      description: 'Description 7',
      price: '20,000',
      imgUrl: '',
      like: true,
    },
    {
      imageUrl: '/imgtest/3.jpeg',
      title: 'Title 8',
      description: 'Description 8',
      price: '10,000',
      imgUrl: '',
      like: false,
    },
    {
      imageUrl: '/imgtest/4.jpeg',
      title: 'Title 9',
      description: 'Description 9',
      price: '20,000',
      imgUrl: '',
      like: false,
    },
    {
      imageUrl: '/imgtest/5.jpeg',
      title: 'Title 10',
      description: 'Description 10',
      price: '10,000',
      imgUrl: '',
      like: true,
    },
    // {
    //   imageUrl: '/imgtest/1.jpeg',
    //   title: 'Title 11',
    //   description: 'Description 11',
    // },
    // {
    //   imageUrl: '/imgtest/2.jpeg',
    //   title: 'Title 12',
    //   description: 'Description 12',
    // },
  ]);

  const handelLikeClick = (i: number) => {
    const updateData = [...contentData];
    updateData[i].like = !updateData[i].like;
    setContentData(updateData);
    // console.log(contentData);
    // console.log('확인', updateData[i].like);
    // FIXME: 좋아요가 변경된 데이터는 다시 몽고db에 저장하기
  };

  return (
    <div>
      <h1>상품리스트</h1>
      {/* <img src='/imgtest/1.jpeg' /> */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {contentData.map((el, i) => (
          <div key={i} className='max-w-sm rounded overflow-hidden shadow-lg'>
            <img src={el.imageUrl} alt={el.title} className='w-full' />
            <div className='px-6 py-4'>
              <div>
                <FontAwesomeIcon
                  icon={el.like ? faHeart : regularHeart}
                  onClick={() => handelLikeClick(i)}
                  className={`h-2 ${el.like ? 'text-red-500' : ''}`}
                />
                장바구니 아이콘 {/* 장바구니 아이콘 추가 및 로직 추가하기 */}
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ color: '#511f1f' }}
                />
              </div>
              {/* TODO: 평점? 추가할지 말지 */}
              <div className='font-bold text-xl mb-2'>{el.title}</div>
              <p className='text-gray-700 text-base'>{el.description}</p>
              <p className='text-gray-700 text-base'>{el.price}원</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
